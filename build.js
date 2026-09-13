const fs = require('fs');

if (
  !fs.existsSync('index.html') ||
  !fs.readFileSync('index.html', 'utf8').includes('AGRINEXUS')
) {
  process.exit(1);
}

console.log('Production prototype build check passed.');