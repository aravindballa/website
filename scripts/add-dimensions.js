const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));
const fs = require('fs');

const WRITINGS_PATH = 'content/writings';

(async () => {
  const images = glob.sync('**/*.{png,jpg,jpeg,gif}', {
    cwd: path.join(process.cwd(), WRITINGS_PATH),
  });

  for (const image of images) {
    const fileName = path.parse(image).name;
    const ext = path.parse(image).ext;
    if (fileName.match(/-[0-9]+x[0-9]+$/)) continue;

    const { width, height } = await sizeOf(path.join(WRITINGS_PATH, image));

    console.log('Renaming', image, 'using', width, height);
    fs.renameSync(
      path.join(WRITINGS_PATH, image),
      path.join(
        WRITINGS_PATH,
        image.replace(`${fileName}.${ext}`, `${fileName}-${width}x${height}.${ext}`)
      )
    );
  }
})();
