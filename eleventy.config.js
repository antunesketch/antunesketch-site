export default function (cfg) {
  ["img", "comics", "admin", "_redirects"].forEach((p) => cfg.addPassthroughCopy(`src/${p}`));
  return { dir: { input: "src", output: "_site" }, htmlTemplateEngine: "njk" };
}
