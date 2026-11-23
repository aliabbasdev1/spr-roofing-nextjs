import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep, join } from 'node:path';

// Next.js static export uses `out/`; `next start` does not work in this mode.
const root=resolve('out');
const port=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml','.ico':'image/x-icon','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.woff2':'font/woff2','.map':'application/json'};
createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url||'/',`http://localhost:${port}`).pathname);
    let requested=resolve(root,'.'+pathname);
    if(requested!==root&&!requested.startsWith(root+sep))throw new Error('Invalid path');
    let meta=await stat(requested).catch(()=>null);
    if(meta?.isDirectory()||pathname.endsWith('/'))requested=join(requested,'index.html');
    else if(!meta){
      // Next static export with trailingSlash creates /page/index.html.
      const dir=join(requested,'index.html');
      if((await stat(dir).catch(()=>null))?.isFile())requested=dir;
    }
    const content=await readFile(requested);
    res.writeHead(200,{'Content-Type':mime[extname(requested)]||'application/octet-stream'});
    if(req.method==='HEAD')res.end();else res.end(content);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not Found');}
}).listen(port,()=>console.log(`SPR Next.js static site: http://localhost:${port}`));
