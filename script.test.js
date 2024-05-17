const drawChart = require("./script");

test("Posicion de X: 1 y Y: 2 esta ubicado en el Sector A", () => {
  expect(drawChart(1, 2)).toBe("A");
});