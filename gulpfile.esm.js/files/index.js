import renameImages from "./rename-images";
import deleteUnused from "./delete-unused";
import renameDirs, { renameFiles } from "./rename-dirs";
import renamePaths from "./rename-paths";
export default {
  rename: {
    imgs: renameImages,
    dirs: renameDirs,
    files: renameFiles,
    paths: renamePaths,
  },
  delete: deleteUnused,
};
