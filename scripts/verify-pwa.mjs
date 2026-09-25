/* global fetch, setTimeout, navigator */
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const origin='http://127.0.0.1:4173';
const server=spawn('npm',['run','preview','--','--port','4173'],{stdio:'ignore'});
const wait=async()=>{for(let n=0;n<50;n++){try{if((await fetch(origin)).ok)return}catch{/* preview is starting */}await new Promise(resolve=>setTimeout(resolve,100))}throw Error('Preview não iniciou')};
try{
 await wait();
 const manifest=await (await fetch(`${origin}/manifest.webmanifest`)).json();
 if(manifest.display!=='standalone'||manifest.icons.length<3)throw Error('Manifesto incompleto');
 for(const icon of manifest.icons)if(!(await fetch(origin+icon.src)).ok)throw Error(`Ícone ausente: ${icon.src}`);
 if(!(await fetch(`${origin}/sw.js`)).ok)throw Error('Service worker ausente');
 const browser=await chromium.launch(),context=await browser.newContext({serviceWorkers:'allow'}),page=await context.newPage();
 await page.goto(origin);await page.waitForFunction(()=>navigator.serviceWorker.controller||navigator.serviceWorker.ready);await page.reload();await context.setOffline(true);await page.goto(`${origin}/journey/first-verses`);await page.getByRole('heading',{name:'Primeiros versículos'}).waitFor();await browser.close();
 console.log('PWA verificada: manifest, ícones, service worker e rota offline.');
} finally {server.kill('SIGTERM')}
