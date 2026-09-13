const fs=require('fs'); if(!fs.existsSync('public/index.html')) throw new Error('Missing public/index.html'); console.log('Production build check passed: static assets are ready.');
