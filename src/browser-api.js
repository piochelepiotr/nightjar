import {api} from '../server/api.mjs';
import {PersistentCache} from '../server/cache.mjs';
// GitHub Pages has no application server. Run source adapters in the browser,
// persisting provider responses in Cache Storage. Optional backend is used only
// when explicitly configured by the visitor; no third-party CORS proxy.
const storageName='nightjar-provider-v1';
const store={async get(key){const c=await caches.open(storageName);const r=await c.match(new URL('provider-cache/'+encodeURIComponent(key),location.href));return r?await r.json():null},async put(key,value){const c=await caches.open(storageName);await c.put(new URL('provider-cache/'+encodeURIComponent(key),location.href),Response.json(value));const keys=await c.keys();if(keys.length>250)await c.delete(keys[0])}};
const cache=new PersistentCache(store);
export async function browserApi(path){if(path.startsWith('/api/availability')&&!navigator.onLine)return Response.json({error:'Offline: current campground availability is unavailable. Saved locations and rules still work.'},{status:503});const proxy=localStorage.getItem('nightjar-backend');if(proxy&&path.startsWith('/api/availability')){const u=new URL(path,proxy);return fetch(u)}return api(new Request(new URL(path,location.origin)),cache)}
