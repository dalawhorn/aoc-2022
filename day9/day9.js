#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day9/day9inputtest.txt";
let fileStream = fs.createReadStream(inputFile);

// Coordinates are stored as x, y
const startPoint = [0, 0];
let headPositions = [];
let tailPositions = [];
let totalUniqueTailMoves = 1;

headPositions.push(startPoint);
tailPositions.push(startPoint);

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    const input = row.split(' ');
    const direction = input[0];
    const moves = input[1];
    const headIncrementOrDecrement = incrementOrDecrement(direction);
    const headIncrementOrDecrementCoord = incrementOrDecrementCoord(direction);
    console.log('dir', direction, 'moves', moves);

    for(let i=0; i<moves; i++) {
      let currentHeadPosition = headPositions[(headPositions.length-1)];
      let currentTailPosition = tailPositions[(tailPositions.length-1)]

      let headMoveCoords = moveCoords(currentHeadPosition, headIncrementOrDecrement, headIncrementOrDecrementCoord);
      console.log(headMoveCoords);



      headPositions.push(currentHeadPosition);
      tailPositions.push(currentTailPosition);
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
});

fileStream.on('error', function(error) {
  console.log(error);
});

function incrementOrDecrement(direction) {
  switch(direction) {
    case "R":
    case "U":
      return "increment";
      break;
    case "L":
    case "D":
      return "decrement";
      break;

  }
}

function incrementOrDecrementCoord(direction) {
  switch(direction) {
    case "L":
    case "R":
      // X (the 0 index)
      return 0;
      break;
    case "U":
    case "D":
      // Y (the 1 index)
      return 1;
      break;

  }
}

function moveCoords(coordinates, incrementOrDecrement, incrementOrDecrementCoord) {
  let newCoords = coordinates;
  if(incrementOrDecrement == "increment") {
    newCoords[incrementOrDecrementCoord] = newCoords[incrementOrDecrementCoord] + 1;
  }
  else if(incrementOrDecrement == "decrement") {
    newCoords[incrementOrDecrementCoord] = newCoords[incrementOrDecrementCoord] - 1;
  }

  return newCoords;
}