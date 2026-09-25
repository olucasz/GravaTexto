import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({ plugins: [react(),VitePWA({
 registerType:'prompt',injectRegister:'auto',includeAssets:['brand/*.svg','icons/*.png','fonts/*.woff2','illustrations/*.svg'],
 manifest:{name:'GravaTexto',short_name:'GravaTexto',description:'Pequenas práticas para guardar textos e referências bíblicas.',start_url:'/',scope:'/',display:'standalone',background_color:'#F7F5ED',theme_color:'#245B43',orientation:'portrait-primary',icons:[{src:'/icons/pwa-192.png',sizes:'192x192',type:'image/png'},{src:'/icons/pwa-512.png',sizes:'512x512',type:'image/png'},{src:'/icons/pwa-maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}]},
 workbox:{navigateFallback:'/index.html',navigateFallbackDenylist:[/^\/api\//],globPatterns:['**/*.{js,css,html,svg,png,woff2,json,md}'],runtimeCaching:[{urlPattern:({request})=>request.destination==='font'||request.destination==='image',handler:'CacheFirst',options:{cacheName:'gravatexto-assets',expiration:{maxEntries:60,maxAgeSeconds:60*60*24*90}}}]},
 devOptions:{enabled:true,navigateFallback:'index.html'}
 })], server: { host: '127.0.0.1' } });
