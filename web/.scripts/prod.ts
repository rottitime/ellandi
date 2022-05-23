#!/usr/bin/env node
/* eslint-disable no-console */

import path from "node:path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { parseHost } from "./lib/url";
import { getWebRoot, getEnv } from "./lib/project";

const ENV = getEnv();

const frontEndHost = parseHost(ENV.VITE_FRONTEND_HOST);

const main = async () => {
  const webRoot = getWebRoot();

  const app = express();

  // a request logger
  app.use(morgan("combined"));
  // general security
  app.use(
    helmet({
      // if using nginx as a reverse proxy, re-enable this
      contentSecurityPolicy: false,
    })
  );

  // gzip compression
  app.use(compression());
  // perma-cacheable static files
  app.use(
    "/assets",
    express.static(path.join(webRoot, "dist", "assets"), {
      setHeaders: (response) => {
        response.setHeader("Cache-Control", "max-age=31536000, immutable");
      },
    })
  );
  // un-perma-cacheable static files
  app.use(express.static(path.join(webRoot, "dist")));
  // redirect 404 GET requests to the index.html file
  // to allow react-router to handle them
  app.use((request, response, next) => {
    if (request.method === "GET") {
      response.sendFile(path.join(webRoot, "dist", "index.html"));
    } else {
      next();
    }
  });

  app.listen(frontEndHost.port, () => {
    console.log(`Started: ${frontEndHost.host}`);
  });
};

main();
