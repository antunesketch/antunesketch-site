// Images under /img are served through Netlify Image CDN: resized WebP/AVIF
// at the size each screen needs. Works for images uploaded via /admin too.
const WIDTHS = [480, 800, 1200, 1600];
const cdn = (src, w) => `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&q=78`;

export default function (cfg) {
  ["img", "comics", "admin", "_redirects", "favicon.ico", "apple-touch-icon.png", "og.jpg"].forEach((p) =>
    cfg.addPassthroughCopy(`src/${p}`)
  );

  cfg.addTransform("responsive-images", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html") || this.page.outputPath.includes("/admin/")) return content;
    let first = true;
    return content.replace(/<img src="(\/img\/[^"]+)"([^>]*)>/g, (m, src, rest) => {
      const isHero = first; first = false;
      rest = rest.replace(/\sloading="lazy"/, "");
      const srcset = WIDTHS.map((w) => `${cdn(src, w)} ${w}w`).join(", ");
      const extra = isHero
        ? ' fetchpriority="high" decoding="async"'
        : ' loading="lazy" decoding="async"';
      return `<img src="${cdn(src, 1200)}" srcset="${srcset}" sizes="(max-width: 700px) 100vw, 50vw"${rest}${extra}>`;
    });
  });

  return { dir: { input: "src", output: "_site" }, htmlTemplateEngine: "njk" };
}
