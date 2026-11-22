export default function (cfg) {
  ["img", "comics", "admin", "_redirects", "favicon.ico", "apple-touch-icon.png"].forEach((p) => cfg.addPassthroughCopy(`src/${p}`));
  return { dir: { input: "src", output: "_site" }, htmlTemplateEngine: "njk" };
}
