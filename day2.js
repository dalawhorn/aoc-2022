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
    },
    col2Outcomes: {
      win: "Y",
      lose: "Z",
      draw: "X"
    }
  },
  B: {
    type: "paper",
    score: 2,
    outcomes: {
      X: "win",
      Y: "draw",
      Z: "lose"
    },
    col2Outcomes: {
      win: "Z",
      lose: "X",
      draw: "Y"
    }
  },
  C: {
    type: "scissors",
    score: 3,
    outcomes: {
      X: "lose",
      Y: "win",
      Z: "draw"
    },
    col2Outcomes: {
      win: "X",
      lose: "Y",
      draw: "Z"
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

const part2Outcomes = {
  X: "lose",
  Y: "draw",
  Z: "win"
}

let col1Score = 0;
let col2Score = 0;

let col2ScorePart2 = 0;

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    let values = row.split(' ');
    let col1ScoreCalc = calculateScore(col1Scores[values[0]], values[1]);
    let col2ScoreCalc = calculateScore(col2Scores[values[1]], values[0]);
    
    col1Score = col1Score + col1ScoreCalc;
    col2Score = col2Score + col2ScoreCalc;

    let part2Score = calculateScorePart2(col1Scores[values[0]], values[1]);
    col2ScorePart2 = col2ScorePart2 + part2Score;
  });
});

fileStream.on('end', function() {
  console.log("Col 1", "Col 2");
  console.log(col1Score, col2Score);
  console.log("Part 2");
  console.log(col2ScorePart2);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function calculateScore(thisColumnData, versusColumnValue) {
  const outcome = thisColumnData.outcomes[versusColumnValue];
  const outcomeScore = outcomeScores[outcome];
  return thisColumnData.score + outcomeScore;
}

function calculateScorePart2(col1Data, col2Outcome) {
  const outcomeType = part2Outcomes[col2Outcome];
  const outcomeMove = col1Data.col2Outcomes[outcomeType];
  const col2Score = col2Scores[outcomeMove].score;
  return col2Score + outcomeScores[outcomeType];
}