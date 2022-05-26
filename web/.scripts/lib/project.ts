import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

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

// This should only be used in build scripts and devtools
// To access env vars inside the ./web/src dir, use:
// import.meta.env.ENV_VAR_NAME
export const getEnv = (): {
  NODE_ENV: "development" | "production";
  VITE_FRONTEND_HOST: string;
  VITE_API_ROOT_URL: string;
  [key: string]: string | undefined;
} => {
  let envVarFile = {};
  try {
    envVarFile =
      dotenv.config({
        path: path.join(getProjectRoot(), ".envs/web"),
      }).parsed ?? {};
  } catch {
    //
  }

  return {
    NODE_ENV: "production",
    VITE_FRONTEND_HOST: "https://ellandi-web.london.cloudapps.digital",
    VITE_API_ROOT_URL: "https://ellandi-api.london.cloudapps.digital",
    VITE_IS_DEMO_MODE: "true",
    ...process.env,
    ...envVarFile,
  };
};
