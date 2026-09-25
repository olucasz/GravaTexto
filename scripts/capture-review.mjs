/* global scrollTo */
import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('.impeccable/review',{recursive:true});
const browser=await chromium.launch(),page=await browser.newPage();
await page.emulateMedia({reducedMotion:'reduce'});
for(const [name,width] of [['desktop',1440],['mobile',390]]){
 await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:5173');
 await page.getByRole('heading',{name:'Qual jornada vamos praticar?'}).waitFor();
 await page.screenshot({path:`.impeccable/review/${name}.png`,fullPage:true});
}
await page.getByRole('button',{name:'Painel de teste',exact:true}).click();
await page.getByLabel('Família de puzzle').selectOption('order_fragments');
await page.getByRole('button',{name:'Abrir galeria isolada'}).click();
await page.locator('.assembly').waitFor();await page.locator('h1').focus();await page.evaluate(()=>scrollTo(0,0));
await page.screenshot({path:'.impeccable/review/order-mobile.png',fullPage:true});
const bank=page.getByLabel('Blocos disponíveis');
while(await bank.locator('button:not([disabled])').count())await bank.locator('button:not([disabled])').first().click();
await page.getByRole('button',{name:'Verificar'}).click();await page.getByRole('button',{name:'Continuar',exact:true}).click();
await page.locator('.result-main').waitFor();await page.evaluate(()=>scrollTo(0,0));
await page.screenshot({path:'.impeccable/review/result-mobile.png',fullPage:true});await browser.close();
