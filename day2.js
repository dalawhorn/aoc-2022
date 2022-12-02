#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day2input.txt";
let fileStream = fs.createReadStream(inputFile);

const col1Scores = {
  A: {
    type: "rock",
    score: 1,
    outcomes: {
      X: "draw",
      Y: "lose",
      Z: "win"
    }
  },
  B: {
    type: "paper",
    score: 2,
    outcomes: {
      X: "win",
      Y: "draw",
      Z: "lose"
    }
  },
  C: {
    type: "scissors",
    score: 3,
    outcomes: {
      X: "lose",
      Y: "win",
      Z: "draw"
    }
  }
};

const col2Scores = {
  X: {
    type: "rock",
    score: 1,
    outcomes: {
      A: "draw",
      B: "lose",
      C: "win"
    }
  },
  Y: {
    type: "paper",
    score: 2,
    outcomes: {
      A: "win",
      B: "draw",
      C: "lose"
    }
  },
  Z: {
    type: "scissors",
    score: 3,
    outcomes: {
      A: "lose",
      B: "win",
      C: "draw"
    }
  }
};

const outcomeScores = {
  win: 6,
  lose: 0,
  draw: 3
}

let col1Score = 0;
let col2Score = 0;

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    let values = row.split(' ');
    let col1ScoreCalc = calculateScore(col1Scores[values[0]], values[1]);
    let col2ScoreCalc = calculateScore(col2Scores[values[1]], values[0]);
    
    col1Score = col1Score + col1ScoreCalc;
    col2Score = col2Score + col2ScoreCalc;
  });
});

fileStream.on('end', function() {
  console.log("Col 1", "Col 2");
  console.log(col1Score, col2Score);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function calculateScore(thisColumnData, versusColumnValue) {
  const outcome = thisColumnData.outcomes[versusColumnValue];
  const outcomeScore = outcomeScores[outcome];
  return thisColumnData.score + outcomeScore;
}