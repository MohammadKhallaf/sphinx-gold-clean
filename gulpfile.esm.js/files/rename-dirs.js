import glob from "glob";
import fs from "fs";
import _ from "lodash";
import path from "path";

export default (done) => {
  // const destinationFolders = glob.sync("src/**/exercise/*");
  const destinationFolders = glob.sync("src/**/task_imgs");
  // const destinationFolders = glob.sync("src/**/assets/*");
  // const destinationFolders = glob.sync("src/*/*/*");
  // const destinationFolders = glob.sync("src/**/editor-drawing");
  // console.log(destinationFolders)
  destinationFolders.forEach((folder) => {
    // const newFolder = folder.replaceAll("_", "");
    console.log(folder);
    const newFolder = _.toLower(folder).replaceAll("_", "");
    if (folder != newFolder) {
      console.log(folder);
      console.log(newFolder);
        fs.renameSync(folder, newFolder, (err) => console.log(err));
    }
  });
  done();
};
