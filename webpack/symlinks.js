/**
  * Symlinks:
  *
  * @app -> if dev then src folder, if prod then bin folder
  * @static -> static
  * 
  * Note: Symlink also in package.json because @app needs to point to bin after compilation
  * when running production
  */

const execSync = require('child_process').execSync

module.exports = function () {
  execSync("rm -rf node_modules/@app && ln -sf ../src node_modules/@app")
  execSync("[ -h ./node_modules/@static ] || ln -sf ../static ./node_modules/@static")
  execSync("[ -h ./node_modules/@config ] || ln -sf ../config ./node_modules/@config")
}