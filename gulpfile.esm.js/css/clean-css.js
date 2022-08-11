const cleanCSS = require("gulp-clean-css");
const { src, dest } = require("gulp");

module.exports = async () =>
  await src(`src/**/*.css`)
    .pipe(
      cleanCSS({ format: "beautify", debug: true }, (details) => {
        console.log(`${details.name}: ERR ${details.errors}`);
        console.log(`${details.name}: WRN ${details.warnings}`);
      })
    )
    .pipe(dest(`src`));
