const assert = require("assert");
const _ = require("lodash");
const fs = require("fs");

const nextFishState = (fishes) => {
  const nextState = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
  Object.entries(fishes).forEach(([k, v]) => {
    const key = Number(k);
    if (key == 0) {
      nextState[6] += v;
      nextState[8] = v;
    } else nextState[key - 1] += v;
  });

  return nextState;
};

const parseData = (input) =>
  Object.assign(
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
    _.countBy(input)
  );

const testData = parseData([3, 4, 3, 1, 2]);

const getFishCountAfterDays = (initial, times) => {
  return times == 0
    ? Object.values(initial).reduce((sum, num) => (sum += num))
    : getFishCountAfterDays(nextFishState(initial), --times);
};

assert(getFishCountAfterDays(testData, 18) == 26);
assert(getFishCountAfterDays(testData, 80) == 5934);
assert(getFishCountAfterDays(testData, 256) == 26984457539);

const input = parseData(
  fs.readFileSync("day6.txt", "utf-8").split(",").map(Number)
);

console.log(`Part 1: ${getFishCountAfterDays(input, 80)}`);
console.log(`Part 2: ${getFishCountAfterDays(input, 256)}`);
