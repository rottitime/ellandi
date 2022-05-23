import fs from "node:fs";
import path from "node:path";

export const getProjectRoot = () => {
  return path.join(getWebRoot(), "..");
};

export const getWebRoot = () => {
  let directory = process.cwd();

  do {
    try {
      const stats = fs.statSync(path.join(directory, "package.json"));
      if (stats.isFile()) {
        break;
      }
    } catch {
      //
    }
    directory = path.dirname(directory);
  } while (directory !== "/");

  if (directory === "/") {
    throw new Error("web directory not found");
  }

  return directory;
};
