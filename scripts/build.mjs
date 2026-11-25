import {build} from 'esbuild';import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
await mkdir('.cache',{recursive:true});await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});
const frontend=await build({entryPoints:['src/app.js','src/style.css'],bundle:true,minify:true,outdir:'.cache/ui',write:false,loader:{'.png':'dataurl'},define:{__GITHUB_PAGES__:'false'},logLevel:'warning'});const assets={};for(const f of frontend.outputFiles){if(f.path.endsWith('.js'))assets['/app.js']={body:f.text,type:'text/javascript; charset=utf-8'};if(f.path.endsWith('.css'))assets['/app.css']={body:f.text,type:'text/css; charset=utf-8'}}
assets['/index.html']={body:await readFile('src/index.html','utf8'),type:'text/html; charset=utf-8'};
for(const [name,type]of Object.entries({'sw.js':'text/javascript','icon.svg':'image/svg+xml','manifest.webmanifest':'application/manifest+json'}))assets['/'+name]={body:await readFile('public/'+name,'utf8'),type};
await writeFile('.cache/entry.mjs',`import {createHandler} from '../server/worker.mjs';export default createHandler(${JSON.stringify(assets)});`);
await build({entryPoints:['.cache/entry.mjs'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'browser',target:'es2022',minify:true,loader:{'.geojson':'json'},logLevel:'info'});

