if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),d={module:{uri:o},exports:t,require:l};s[o]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-4de3aa5f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Home-d57ca304.js",revision:null},{url:"assets/index-1ee5937c.css",revision:null},{url:"assets/index-df814d90.js",revision:null},{url:"index.html",revision:"ed0448ea0b62b408079f324575c2f911"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"sangam-logo-1.png",revision:"e086c2d49e71978e8efd0d11ba908817"},{url:"sangam-logo.png",revision:"8881daa9573aa7eb7cec301aae64551e"},{url:"manifest.webmanifest",revision:"0a4fcdf774ce723e9a49d46c179f191e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
