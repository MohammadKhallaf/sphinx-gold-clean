/**
 * Get list of directories in the src folder
 */
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

const directories = (source) => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .reduce((a, c) => {
      c.isDirectory() && a.push(c.name);
      return a;
    }, [])
    .filter((txt) => !txt.includes("node") && !txt.includes("vscode"));
};
const srcPath = path.join(process.cwd(), "src");
const srcFolders = directories(srcPath);
const allDirs = srcFolders.map((folder) => {
  const dirs = directories(path.join(srcPath, folder));
  return dirs.map((dir) => path.posix.join("src", folder, dir));
});
const lessonsArr = _.flatten(allDirs);
exports.directories = directories;
exports.lessonsArr = lessonsArr;
