import cleanHtml from "./clean-html";
import { findEXc, findAud, findLight, rmMath } from "./find-elements";
export default {
  clean: cleanHtml,
  find: { exercise: findEXc, audio: findAud, lightBox: findLight },
  del: { math: rmMath },
};
