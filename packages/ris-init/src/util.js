const vfs = require('vinyl-fs');
const through = require('through2');

function replace(replacer) {
  return through.obj((file, enc, cb) => {
    if (!file.stat.isFile() || !replacer) {
      return cb();
    }
    try {
      replacer(file);
    } catch (e) {
      console.log(e);
    }

    return cb(null, file);
  });
}

module.exports = {
  copy(src, dest, replacer) {
    return new Promise((resolve, reject) => {
      vfs.src('**/*', {
        cwd: src,
        cwdbase: true,
        dot: true,
      })
        .pipe(replace(replacer))
        .pipe(vfs.dest(dest))
        .on('end', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        })
        .resume();
    });
  },
};
