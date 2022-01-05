const fs = require('fs');
const fse = require('fs-extra');
const rimraf = require('rimraf');

(async () => {
  if (fs.existsSync('out')) rimraf.sync('out');

  fs.mkdirSync('out');
  fs.copyFileSync('package.json', 'out/package.json');

  await fse.copy('dist', 'out/dist');
})();
