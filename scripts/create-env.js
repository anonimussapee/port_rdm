const fs=require('fs');
fs.writeFileSync('./.env',`API_LINK=${process.env.API_LINK}\n`);