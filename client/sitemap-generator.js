import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

// ONLY public pages (no admin, no auth pages)
const routes = [
  "/",
  "/meistä",
  "/palvelut",
  "/galleria",
  "/tuotet",
  "/yhteystiedot",
  "/opinion"
];

const sitemap = new SitemapStream({
  hostname: "https://razorr.fi"
});

routes.forEach((route) => {
  sitemap.write({
    url: route,
    changefreq: "weekly",
    priority: 0.8
  });
});

sitemap.end();

(async () => {
  const xmlBuffer = await streamToPromise(sitemap);

  const finalXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    xmlBuffer.toString();

  fs.writeFileSync("./public/sitemap.xml", finalXml);
  console.log("✅ sitemap.xml generated successfully!");
})();
