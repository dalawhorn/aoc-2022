#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day8/day8input.txt";
let fileStream = fs.createReadStream(inputFile);

let totalColumns = 0;
let totalRows = 0;
let totalPerimeter = 0;
let totalVisible = 0;
let highestTreeScore = 0;
let treeGrid = [];

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    treeGrid.push(row.split(''));
  });
});

fileStream.on('end', function() {
  totalColumns = treeGrid[0].length;
  totalRows = treeGrid.length;
  totalPerimeter = (totalRows * 2) + ((totalColumns - 2) * 2);
  totalVisible += totalPerimeter

  for(let row=1; row<(totalRows-1); row++) {
    for(let col=1; col<(totalColumns-1); col++) {
      let surroundingTrees = getSurroundingTrees(row, col);

      // Part1
      // console.log('row', row, 'col', col);
      let currentTreeHeight = treeGrid[row][col];
      // console.log('current tree height', currentTreeHeight);
      let isVisible = checkIfTreeVisible(surroundingTrees, currentTreeHeight);
      if(isVisible) {
        // console.log('Visible!');
        totalVisible++;
      }

      // Part 2
      let treeScore = calculateTreeViewScore(surroundingTrees, currentTreeHeight);
      if(treeScore > highestTreeScore) {
        highestTreeScore = treeScore;
      }
    }
  }

  console.log('Rows', totalRows, 'Cols', totalColumns, 'Perimeter', totalPerimeter);
  console.log('Visible', totalVisible);
  console.log('Highest Tree Score', highestTreeScore);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function checkIfTreeVisible(surroundingTrees, height) {
  let left = surroundingTrees['left'];
  // console.log('left', left);
  if(compareHeightVal(left, height)) {
    console.log('Tree is visible to left');
    return true;
  }

  let right = surroundingTrees['right'];
  // console.log('right', right);
  if(compareHeightVal(right, height)) {
    console.log('Tree is visible to right');
    return true;
  }

  let up = surroundingTrees['up'];
  // console.log('up', up);
  if(compareHeightVal(up, height)) {
    console.log('Tree is visible up');
    return true;
  }

  let down = surroundingTrees['down'];
  // console.log('down', down);
  if(compareHeightVal(down, height)) {
    console.log('Tree is visible down');
    return true;
  }

  return false;
}

function getSurroundingTrees(row, col) {
  return trees = {
    left: getTreesByDirection('left', row, col),
    right: getTreesByDirection('right', row, col),
    up: getTreesByDirection('up', row, col),
    down: getTreesByDirection('down', row, col)
  }
}

function getTreesByDirection(direction, row, col) {
  let returnTrees = [];

  switch(direction) {
    case "left":
      treeGrid[row].forEach(function(heightVal, index) {
        if(index < col) {
          returnTrees.push(heightVal);
        }
      });
      break;
    case "right":
      treeGrid[row].forEach(function(heightVal, index) {
        if(index > col) {
          returnTrees.push(heightVal);
        }
      });
      break;
    case "up":
      treeGrid.forEach(function(treeRow, rowIndex) {
        if(rowIndex != row && rowIndex < row){
          returnTrees.push(treeRow[col]);
        }
      });
      break;
    case "down":
      treeGrid.forEach(function(treeRow, rowIndex) {
        if(rowIndex != row && rowIndex > row){
          returnTrees.push(treeRow[col]);
        }
      });
      break;
  }

  return returnTrees;
}

function compareHeightVal(arrVals, heightVal) {
  let lessCount = 0;

  for(i=0; i<arrVals.length; i++) {
    if(arrVals[i] < heightVal) {
      lessCount++;
    }
  }

  if(lessCount == arrVals.length) {
    return true;
  }

  return false;
}

function calculateTreeViewScore(surroundingTrees, height) {
  let leftTotal = getDirectionTreeViewTotal(surroundingTrees['left'], height, 'left');
  let rightTotal = getDirectionTreeViewTotal(surroundingTrees['right'], height, 'right');
  let upTotal = getDirectionTreeViewTotal(surroundingTrees['up'], height, 'up');
  let downTotal = getDirectionTreeViewTotal(surroundingTrees['down'], height, 'down');

  // console.log(surroundingTrees, height);
  // console.log(upTotal, leftTotal, downTotal, rightTotal);
  return (upTotal * leftTotal * downTotal * rightTotal);
}

function getDirectionTreeViewTotal(directionTrees, height, direction) {
  const numTrees = directionTrees.length;
  let treeTotal = 0;

  switch(direction) {
    case "left":
    case "up":
      for(i=(numTrees-1); i>=0; i--) {
        let tree = directionTrees[i];
        treeTotal++;
    
        if(tree >= height) {
          //Found a tree that is the same or taller than the current tree height
          //so we stop
          break;
        }
      }
      break;
    case "right":
    case "down":
      for(i=0; i<numTrees; i++) {
        let tree = directionTrees[i];
        treeTotal++;
    
        if(tree >= height) {
          //Found a tree that is the same or taller than the current tree height
          //so we stop
          break;
        }
      }
      break;
  }

  

  return treeTotal;
}