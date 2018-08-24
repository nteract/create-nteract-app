const fs = require("fs");

describe("it checks that the project was create successfully", () => {
  it("checks that the project was initiated", () => {
    expect(fs.existsSync("snow-leopard/package.json")).toBe(true);
  });
  it("checks that the project template was created", () => {
    expect(fs.existsSync("snow-leopard/components/")).toBe(true);
  });
  it("checks that the project template was created", () => {
    expect(fs.existsSync("snow-leopard/pages/index.js")).toBe(true);
  });
});
