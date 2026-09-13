const fs = require('fs');

if (!fs.existsSync('index.html')) {
  throw new Error('Missing index.html');
}

if (!fs.existsSync('server.js')) {
  throw new Error('Missing server.js');
}

if (!fs.existsSync('package.json')) {
  throw new Error('Missing package.json');
}

console.log('Production build check passed: AGRINEXUS files are ready.');