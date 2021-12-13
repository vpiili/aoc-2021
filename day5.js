const fs = require("fs");
const assert = require("assert");
const _ = require("lodash");

const getOverlappingCountWithoutDiagonals = (vectors) => {
  return getOverlappingCount(
    vectors.filter(([{ x1, y1 }, { x2, y2 }]) => x1 == x2 || y1 == y2)
  );
};

const getOverlappingCount = (vectors) => {
  const getPoints = ([{ x1, y1 }, { x2, y2 }]) => {
    const dirX = x1 == x2 ? undefined : x1 > x2 ? "-" : "+";
    const dirY = y1 == y2 ? undefined : y1 > y2 ? "-" : "+";
    const length =
      Math.abs(x1 - x2) > Math.abs(y1 - y2)
        ? Math.abs(x1 - x2)
        : Math.abs(y1 - y2);
    return _.range(length + 1).map((i) => {
      return {
        x: dirX == undefined ? x1 : eval(`${x1}${dirX}${i}`),
        y: dirY == undefined ? y1 : eval(`${y1}${dirY}${i}`),
      };
    });
  };

  const points = vectors.map(getPoints).flat();

  return Object.values(
    _.countBy(points, (point) => Object.values(point))
  ).filter((v) => v >= 2).length;
};

const parseInput = (input) =>
  input
    .split(/\n/)
    .map((line) => line.split(" -> ").map((pair) => pair.split(",")))
    .map((vector) =>
      vector.map((point, index) => {
        return {
          [`x${index + 1}`]: Number(point[0]),
          [`y${index + 1}`]: Number(point[1]),
        };
      })
    );

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

assert(getOverlappingCountWithoutDiagonals(parseInput(testInput)) === 5);
assert(getOverlappingCount(parseInput(testInput)) === 12);

const input = parseInput(fs.readFileSync("day5.txt", "utf-8"));
/*
console.log(`Part 1: ${getOverlappingCountWithoutDiagonals(input)}`);
console.log(`Part 2: ${getOverlappingCount(input)}`);*/
