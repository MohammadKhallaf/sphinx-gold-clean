import {
  copyFonts,
  copyCssFont,
  copyPopper,
  findPopper,
  copyExFont,
  popperFix,
  animateLib,
} from "./copy-files";
import { series } from "gulp";

export default {
  extFont: copyExFont,
  popper: {
    all: series(copyPopper, findPopper),
    find: findPopper,
    copy: copyPopper,
  },
  animate: animateLib,
};
