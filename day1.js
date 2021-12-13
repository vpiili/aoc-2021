const fs = require("fs");
const assert = require("assert");

const increaseCalculator = (data) =>
  data.reduce(
    (increasingCount, currentValue, currentIndex, array) =>
      increasingCount + (currentValue > array[currentIndex - 1] ? 1 : 0),
    0
  );

const generateBlocks = (data) => {
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  return zip(data, zip(data.slice(1), data.slice(2)))
    .map((arr) => arr.flat().filter((elem) => elem))
    .filter((arr) => arr.length === 3)
    .map((arr) => arr.reduce((sum, elem) => (sum += elem)));
};

const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
assert(increaseCalculator(testData) == 7);
assert(increaseCalculator(generateBlocks(testData)) == 5);

const input = fs.readFileSync("day1.txt", "utf-8").split("\n").map(Number);

console.log(`Part 1: ${increaseCalculator(input)}`);
console.log(`Part 2: ${increaseCalculator(generateBlocks(input))}`);
