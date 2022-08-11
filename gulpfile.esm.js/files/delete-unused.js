import del from "del";
export default async () =>
  await del.sync(
    [
      "src/**/webfonts",
      "src/**/sass",
      "src/**/fontawesome*",
      "src/**/INFROMAN*",
      "src/**/AptiferSansLTPro*",
      "src/**/CandyShopBlack*",
      "src/**/LCALLIG*",
      // "src/**/Quicksand*", // only after renaming the fonts to lower case
      // "src/**/quicksandlight*",
      // "src/**/quicksandregular*",
      // "src/**/quicksandsemi*",
      "src/**/Sasso*",
      "src/**/.vscode",
    ]
  );
