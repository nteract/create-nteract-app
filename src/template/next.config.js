const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/
});
module.exports = withMDX({
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  },
  pageExtensions: ["md", "mdx"]
});
