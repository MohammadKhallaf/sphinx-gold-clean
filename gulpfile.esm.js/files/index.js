import renameImages from "./rename-images";
import deleteUnused from "./delete-unused";
import renameDirs from "./rename-dirs";
export default {
  rename: { imgs: renameImages, dirs: renameDirs },
  delete: deleteUnused,
};
