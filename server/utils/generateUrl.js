import DataUriParser from "datauri/parser.js";
import path from "path";

export const generateUrl = (file) => {
  if (!file || !file.originalname || !file.buffer) return null;

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  return parser.format(extName, file.buffer);
};
