#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day9/day9input.txt";
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
      // console.log(headMoveCoords);

      let tailMoveCoords = getTailMove(headMoveCoords, currentTailPosition, direction);

      if(isTailMoveUnique(tailMoveCoords)) {
        totalUniqueTailMoves++;
      }

      headPositions.push(headMoveCoords);
      tailPositions.push(tailMoveCoords);
      // console.log(headPositions);
      // console.log(tailPositions);
      // console.log(totalUniqueTailMoves);
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
  console.log('Total unique tail moves', totalUniqueTailMoves);
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
  let newCoords = [];
  newCoords.push(coordinates[0]);
  newCoords.push(coordinates[1]);

  if(incrementOrDecrement == "increment") {
    newCoords[incrementOrDecrementCoord] = newCoords[incrementOrDecrementCoord] + 1;
  }
  else if(incrementOrDecrement == "decrement") {
    newCoords[incrementOrDecrementCoord] = newCoords[incrementOrDecrementCoord] - 1;
  }

  return newCoords;
}

function getTailMove(newHeadCoords, currentTailCoords, direction) {
  // console.log(newHeadCoords, currentTailCoords);
  if(isTailTouchingHead(newHeadCoords, currentTailCoords)) {
    return currentTailCoords;
  }
  else {
    console.log('Tail is not touching, move it!');
    if(newHeadCoords[0] === currentTailCoords[0]) {
      // Same column (X), change row (Y value)
      console.log('up/down');
      let headY= newHeadCoords[1];
      let tailY = currentTailCoords[1];
      
      if(headY > tailY) {
        return [currentTailCoords[0], (((headY - tailY) - 1) + tailY)];
      }
      else {
        return [currentTailCoords[0], (((tailY - headY) - 1) + headY)];
      }
      
    }
    else if(newHeadCoords[1] === currentTailCoords[1]) {
      // Same row (Y), change column (X)
      console.log('left/right')
      let headX = newHeadCoords[0];
      let tailX = currentTailCoords[0];
      
      // if(direction == "L") {
      //   console.log('L step');
      //   console.log(headX, tailX);
      //   console.log("X", (((headX - tailX) - 1) + tailX));
      // }

      if(headX > tailX) {
        return [(((headX - tailX) - 1) + tailX), currentTailCoords[1]];
      }
      else {
        return [(((tailX - headX) - 1) + headX), currentTailCoords[1]]
      }
      
    }
    else {
      // Diagonal move... panic!!
      console.log('diagonal');
      let tailSurroundingDiagonals = getSurroundingDiagonalCoords(currentTailCoords);
      let headSurrounding = getSurroundingCoords(newHeadCoords);

      for(const tailProperty in tailSurroundingDiagonals) {
        let tailCoords = tailSurroundingDiagonals[tailProperty]
        for(const headProperty in headSurrounding) {
          let headCoords = headSurrounding[headProperty]
          if(tailCoords[0] == headCoords[0] && tailCoords[1] == headCoords[1]) {
            return tailCoords;
          }
        }
      }
    }

  }
}

function isTailTouchingHead(newHeadCoords, currentTailCoords) {
  let aroundHeadCoords = getSurroundingCoords(newHeadCoords);

  for(const property in aroundHeadCoords) {
    if(currentTailCoords[0] === aroundHeadCoords[property][0] && currentTailCoords[1] === aroundHeadCoords[property][1]) {
      return true;
    }
  }

  return false;
}

function getSurroundingCoords(coords) {
  let returnCoords =  {
    center: coords,
    up: [coords[0], coords[1] + 1],
    down: [coords[0], coords[1] -1],
    left: [coords[0] - 1, coords[1]],
    right: [coords[0] + 1, coords[1]],
    upperLeft: [coords[0] - 1, coords[1] + 1],
    upperRight: [coords[0] + 1, coords[1] + 1],
    lowerLeft: [coords[0] - 1, coords[1] - 1],
    lowerRight: [coords[0] + 1, coords[1] - 1]
  }

  return returnCoords;
}

function getSurroundingDiagonalCoords(coords) {
  let surroundCoords = getSurroundingCoords(coords);
  return {
    upperLeft: surroundCoords['upperLeft'],
    upperRight: surroundCoords['upperRight'],
    lowerLeft: surroundCoords['lowerLeft'],
    lowerRight: surroundCoords['lowerRight']
  }
}

function isTailMoveUnique(coords) {
  for(let i=0; i<tailPositions.length; i++) {
    let position = tailPositions[i];
    if(position[0] == coords[0] && position[1] == coords [1]) {
      return false;
    }
  }

  return true;
}