const fs = require("fs");
const assert = require("assert");
const _ = require("underscore");

const transpose = (matrix) => _.zip(...matrix);
const hasBingo = (board) =>
  board
    .concat(transpose(board))
    .find((row) => row.every((elem) => elem == "X"));

const markNumber = (board, number) =>
  board.map((row) => row.map((num) => (num == number ? "X" : num)));

const getScore = (board, feed) =>
  board
    .flat()
    .filter((num) => num != "X")
    .reduce((sum, num) => (sum += num)) * feed;

const bingoScoreWithFirst = (boards, feed) => {
  const marked = boards.map((board) => markNumber(board, feed[0]));
  const winner = marked.find(hasBingo);

  return winner
    ? getScore(winner, feed[0])
    : bingoScoreWithFirst(marked, feed.slice(1));
};

const bingoScoreWithLast = (boards, feed) => {
  const marked = boards.map((board) => markNumber(board, feed[0]));

  return marked.every(hasBingo)
    ? getScore(
        markNumber(
          boards.find((board) => !hasBingo(board)),
          feed[0]
        ),
        feed[0]
      )
    : bingoScoreWithLast(marked, feed.slice(1));
};

const testBoards = [
  [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ],
  [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6],
  ],
  [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ],
];
const testFeed = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
];
assert(bingoScoreWithFirst(testBoards, testFeed) === 4512);
assert(bingoScoreWithLast(testBoards, testFeed) === 1924);

const [head, ...tail] = fs.readFileSync("day4.txt", "utf-8").split("\n\n");
const feed = head.split(",").map(Number);
const boards = tail.map((board) =>
  board.split("\n").map((row) => row.split(/\s?\s/).map(Number))
);

console.log(`Part 1: ${bingoScoreWithFirst(boards, feed)}`);
console.log(`Part 2: ${bingoScoreWithLast(boards, feed)}`);
