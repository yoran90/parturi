import fs from "fs";
import * as sitemapPkg from "sitemap"; // ← correct import for ESM
import routes from "./src/sitemapRoutes.js";

const { SitemapStream, streamToPromise } = sitemapPkg;

const sitemap = new SitemapStream({ hostname: "https://razorr.fi" });

routes.forEach(route => {
  sitemap.write({ url: route, changefreq: "weekly", priority: 0.8 });
});

sitemap.end();

(async () => {
  const data = await streamToPromise(sitemap);
  fs.mkdirSync("./public", { recursive: true });
  fs.writeFileSync("./public/sitemap.xml", data.toString());
  console.log("sitemap.xml generated successfully!");
})();
