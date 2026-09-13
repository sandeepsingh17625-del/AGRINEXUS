const http=require('http'),fs=require('fs'),path=require('path');
const port=process.env.PORT||4173; const root=path.join(__dirname,'public');
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{let u=new URL(req.url,'http://localhost'); if(u.pathname.startsWith('/api/')) return api(req,res,u);
let p=u.pathname==='/'?'/index.html':u.pathname; let f=path.join(root,p); if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()) f=path.join(root,'index.html');
res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'text/plain'});res.end(fs.readFileSync(f));});
function api(req,res,u){const body=JSON.stringify({ok:true,route:u.pathname,simulated:true});res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});res.end(body)}
server.listen(port,()=>console.log(`AGRINEXUS running at http://localhost:${port}`));
