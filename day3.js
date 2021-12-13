const fs = require("fs");
const assert = require("assert");
const _ = require("underscore");

const transpose = (data) => _.zip(...data).map((row) => row.join(""));
const commonBitInWord = (word) => word.split("").sort()[(word.length / 2) | 0];

const powerConsumption = (data) => {
  const transposed = transpose(data);
  const gamma = transposed.map(commonBitInWord);
  const epsilon = gamma.map((bit) => 1 ^ bit);

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
};

const oxygenGeneratorRating = (data) => {
  return rating(data, (word, commonBit, index) => word[index] == commonBit);
};

const co2ScrubberRating = (data) => {
  return rating(data, (word, commonBit, index) => word[index] != commonBit);
};

const rating = (data, satisfyer, index = 0) => {
  if (data.length === 1) return parseInt(data[0], 2);
  const transposed = transpose(data);
  const commonBit = commonBitInWord(transposed[index]);
  const satisfied = data.filter((word) => satisfyer(word, commonBit, index));

  return rating(satisfied, satisfyer, ++index);
};

const testData = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

assert(powerConsumption(testData) == 198);
assert(oxygenGeneratorRating(testData) == 23);
assert(co2ScrubberRating(testData) == 10);

const input = fs.readFileSync("day3.txt", "utf-8").split("\n");

console.log(`Part 1: ${powerConsumption(input)}`);
console.log(
  `Part 2: ${oxygenGeneratorRating(input) * co2ScrubberRating(input)}`
);
