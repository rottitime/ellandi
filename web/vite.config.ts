import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
import { parseHost } from "./.scripts/lib/url";
import { getEnv } from "./.scripts/lib/project";

const ENV = getEnv();
const frontEndHost = parseHost(ENV.VITE_FRONTEND_HOST);

// https://vitejs.dev/config/
export default defineConfig({
  base: ENV.VITE_FRONTEND_HOST + "/",
  server: {
    watch: {
      ignored: ["**/tsconfig.json"],
    },
    port: frontEndHost.port,
  },
  resolve: {
    alias: [{ find: "_", replacement: path.resolve(process.cwd(), "src") }],
  },
  plugins: [
    react(),
    // needed for filesystem routing / bundling
    pages(),
    // inject an error catch and report tool into index.html
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(
          "<script ",
          `<script>var e=20;function t(e){return JSON.stringify(JSON.stringify(e)).slice(1,-1)}var r=Object.create(null),n=Object.create(null);window.addEventListener("error",(function(i){try{if(!i.message.includes("ResizeObserver loop")){var a=i.message||"",s=i.filename||"",o=i.lineno||0,c=i.colno||0,l=JSON.stringify([s,o,c,a]);if(n[l]!==r&&e-- >0){n[l]=r;var u=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");u.open("POST","${ENV.VITE_API_HOST}/web-error"),u.setRequestHeader("Content-Type","application/json"),u.send(JSON.stringify({message:t(a),stack:(i.error&&i.error.stack||"").split("\\n").slice(0,3).join("\\n"),userAgent:navigator.userAgent||"",fileName:s,lineNum:o,colNum:c}))}}}catch(e){}}))</script>\n    <script `
        );
      },
      enforce: "post",
      apply: "build",
    },
  ],
});