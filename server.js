const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const root = __dirname;
const port = process.env.PORT || 4173;

let state = {
  inventory: 1500,
  orders: 1,
  routeOptimized: false,
  delivered: false,
  paid: false,
  feedback: false,
  notifications: []
};

function json(res, obj, code = 200) {
  res.writeHead(code, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  const u = url.parse(req.url, true);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (u.pathname.startsWith('/api/')) {
    if (u.pathname === '/api/state') {
      return json(res, state);
    }

    if (u.pathname === '/api/produce' && req.method === 'POST') {
      state.inventory += 1500;
      state.notifications.unshift(
        'Your produce is now visible to verified buyers.'
      );
      return json(res, {
        ok: true,
        inventory: state.inventory
      });
    }

    if (u.pathname === '/api/demo/reset') {
      state = {
        inventory: 1500,
        orders: 1,
        routeOptimized: false,
        delivered: false,
        paid: false,
        feedback: false,
        notifications: []
      };
      return json(res, state);
    }

    if (u.pathname === '/api/demo/action') {
      const action = u.query.action;

      if (action === 'route') state.routeOptimized = true;
      if (action === 'deliver') state.delivered = true;

      if (action === 'pay') {
        state.paid = true;
        state.feedback = true;
        state.notifications.unshift(
          'Payment of ₹13,000 settled.'
        );
      }

      return json(res, state);
    }

    return json(res, { error: 'API route not found' }, 404);
  }

  // Serve the actual root index.html
  let requestPath = u.pathname === '/' ? '/index.html' : u.pathname;

  let file = path.join(root, requestPath);

  if (
    !file.startsWith(root) ||
    !fs.existsSync(file) ||
    fs.statSync(file).isDirectory()
  ) {
    file = path.join(root, 'index.html');
  }

  const ext = path.extname(file);

  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, {
    'Content-Type': types[ext] || 'text/plain'
  });

  fs.createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`AGRINEXUS running at http://localhost:${port}`);
});