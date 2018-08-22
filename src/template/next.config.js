const withMDX = require("@zeit/next-mdx")();
module.exports = withMDX({
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  }
});
