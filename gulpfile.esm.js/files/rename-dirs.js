import glob from "glob";
import fs from "fs";
import _ from "lodash";
import path from "path";

/* rename directories only for 10 levels depth */
export default (done) => {
  for (let x = 1; x <= 15; x++) {
    const src = "src" + "/*".repeat(x) + (x == 15 ? "*" : "");
    console.log(src);
    const destinationFolders = glob.sync(src);
    destinationFolders.forEach((folder) => {
      if (!fs.statSync(folder).isDirectory()) return;
      console.log(folder);
      const newFolder = _.toLower(folder).replaceAll(/_|-|\'|\’| /g, "");
      if (folder != newFolder) {
        console.log(folder);
        console.log(newFolder);
        fs.renameSync(folder, newFolder, (err) => console.log(err));
      }
    });
  }
  done();
};

export const renameFiles = (done) => {
  for (let x = 1; x <= 10; x++) {
    const destinationFolders = glob.sync("src/**");
    destinationFolders.forEach((folder) => {
      if (fs.statSync(folder).isDirectory()) return;
      console.log(folder);
      const newFolder = _.toLower(folder).replaceAll(/_|-|\'|\’| /g, "");
      if (folder != newFolder) {
        console.log(folder);
        console.log(newFolder);
        fs.renameSync(folder, newFolder, (err) => console.log(err));
      }
    });
  }
  done();
};
