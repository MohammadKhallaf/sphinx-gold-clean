import through2 from "through2";
import mime from "mime";
import css from "css";
import { Parser } from "htmlparser2";
import gutil from "gulp-util";
import path from "path";
import _ from "lodash";
import { deleteAsync } from "del";
// const { deleteAsync } from "del";
var PLUGIN_NAME = "gulp-unused-images";
let mPath;
function unusedImages(options) {
  options = options || {
    log: true,
  };

  function addUsed(imageUrl) {
    if (!imageUrl.match(/(data|http|https):/)) {
      usedImageNames.push(path.basename(imageUrl));
    }
  }

  var imageNames = [];
  var usedImageNames = [];
  var ngUsedImages = [];

  var htmlParser = new Parser({
    onopentag: function onopentag(name, attribs) {
      if (name === "img") {
        if (attribs.src) {
          addUsed(attribs.src);
        }
        if (attribs["ng-src"]) {
          ngUsedImages.push(attribs["ng-src"]);
        }
      }
      // eg shortcut icon apple-touch-icon, it doesnt matter if we add extras that are not images
      else if (name === "link" && attribs.href) {
        addUsed(attribs.href);
      }
      // eg msapplication-xxx
      else if (name === "meta" && attribs.content) {
        addUsed(attribs.content);
      } else if (name === "a" && attribs.href) {
        addUsed(attribs.href);
      }
      // video posters
      else if (name == "video" && attribs.poster) {
        addUsed(attribs.poster);
      } else if (name == "image" && attribs["xlink:href"]) {
        addUsed(attribs["xlink:href"]);
      } else {
        const imgMatch = attribs.style?.match(/url\(("|'|)(.+?)\1\)/);
        if (imgMatch) {
          if (imgMatch[2]) {
            addUsed(imgMatch[2]);
          }
        }
      }
    },
  });

  var transform = through2.obj(function (chunk, enc, callback) {
    var self = this;
    if (chunk._base.includes(path.join("resources", "images"))) {
      // console.log("base", chunk._base);
    }
    mPath = chunk._base;
    if (chunk.isNull()) {
      self.push(chunk);
      return callback();
    }

    if (chunk.isStream()) {
      return callback(
        new gutil.PluginError(PLUGIN_NAME, "Streaming not supported")
      );
    }

    if (mime.getType(chunk.path).match(/image\//)) {
      imageNames.push(path.basename(chunk.path));
      return callback();
    }

    try {
      var ast = css.parse(String(chunk.contents));

      ast.stylesheet.rules.forEach(function (rule) {
        if (rule.type != "rule" && rule.type != "media") {
          return;
        }
        if (rule.type === "rule") {
          rule.declarations?.forEach(function (declaration) {
            var match = declaration.value?.match(/url\(("|'|)(.+?)\1\)/);

            if (match) addUsed(match[2]);
          });
        } else {
          rule.rules?.forEach((r) => {
            r.declarations?.forEach(function (declaration) {
              var match = declaration.value?.match(/url\(("|'|)(.+?)\1\)/);

              if (match) {
                addUsed(match[2]);
              }
            });
          });
        }
      });
    } catch (e) {
      htmlParser.write(String(chunk.contents));
    }

    self.push(chunk);
    callback();
  });

  transform.on("finish", function () {
    var unused = _.difference(imageNames, usedImageNames);
    _.mixin({
      findUsedImages: function (imageNames, usedImageNames) {
        return _.filter(imageNames, function (path) {
          return _.includes(usedImageNames, _(path).split("/").last());
        });
      },
    });
    var usedImages = _.findUsedImages(imageNames, usedImageNames);

    if (unused.length && options.log) {
      if (options.delete) {
        unused.forEach(async (img) => {
          const imgPath = String(
            path.posix.join(
              mPath.replace(/\\/g, "/"),
              "resources",
              "images",
              "**",
              img
            )
          );
          // mPath, "resources", "images",
          console.log("mPath:\t" + mPath);
          console.log("imgPath:\t" + imgPath);
          // try {
          // const deletedFilePaths = del(imgPath)
          //   .then((paths) => {
          //     console.log("Deleted files:\n", paths.join("\n"));
          //   })
          const deletedFilePaths = await deleteAsync([imgPath], {
            cwd: mPath,
            onProgress: (progress) => {
              console.log(progress);
            },
          });
          console.log("Deleted files:\n", deletedFilePaths.join("\n"));
          // } catch (e) {
          //   console.log(imgPath + " Not Found");
          // }
        });
      }
      this.emit(
        "error",
        new Error(
          "Unused images: \n-\t" + unused.join("\n-\t")
          //  + '\nng-src: ' + ngUsedImages.join(', ')
        )
      );
    }
  });

  return transform;
}

export default unusedImages;
