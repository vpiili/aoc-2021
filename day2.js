const fs = require("fs");
const assert = require("assert");

const calculatePositionSumWithoutAim = (data) => {
  return calculateFinalPositionSum(
    (position, { direction, amount }) => {
      switch (direction) {
        case "forward":
          position.horizontal += amount;
          break;
        case "down":
          position.depth += amount;
          break;
        case "up":
          position.depth -= amount;
          break;
      }
      return position;
    },
    { horizontal: 0, depth: 0 },
    data
  );
};

const calculatePositionSumWithAim = (data) => {
  return calculateFinalPositionSum(
    (position, { direction, amount }) => {
      switch (direction) {
        case "forward":
          position.horizontal += amount;
          position.depth += position.aim * amount;
          break;
        case "down":
          position.aim += amount;
          break;
        case "up":
          position.aim -= amount;
          break;
      }
      return position;
    },
    { horizontal: 0, depth: 0, aim: 0 },
    data
  );
};

const calculateFinalPositionSum = (calculator, initialPosition, data) => {
  const finalPosition = data.reduce(calculator, initialPosition);
  return finalPosition.horizontal * finalPosition.depth;
};

const testData = [
  { direction: "forward", amount: 5 },
  { direction: "down", amount: 5 },
  { direction: "forward", amount: 8 },
  { direction: "up", amount: 3 },
  { direction: "down", amount: 8 },
  { direction: "forward", amount: 2 },
];
assert(calculatePositionSumWithoutAim(testData) === 150);
assert(calculatePositionSumWithAim(testData) === 900);

const lines = fs.readFileSync("day2.txt", "utf-8").split("\n");
const input = lines
  .map((line) => line.split(" "))
  .map(([direction, amount]) => {
    return { direction, amount: Number(amount) };
  });

console.log(`Part 1: ${calculatePositionSumWithoutAim(input)}`);
console.log(`Part 2: ${calculatePositionSumWithAim(input)}`);
