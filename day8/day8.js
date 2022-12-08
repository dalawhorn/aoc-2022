#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day8/day8input.txt";
let fileStream = fs.createReadStream(inputFile);

let totalColumns = 0;
let totalRows = 0;
let totalPerimeter = 0;
let totalVisible = 0;
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
    // searchPositionIndex['row'] = row;
    // searchPositionIndex['col'] = 1;

    for(let col=1; col<(totalColumns-1); col++) {
      // console.log('row', row, 'col', col);
      let currentTreeHeight = treeGrid[row][col];
      // console.log('current tree height', currentTreeHeight);
      let isVisible = checkIfTreeVisible(row, col, currentTreeHeight);
      if(isVisible) {
        // console.log('Visible!');
        totalVisible++;
      }
    }
  }

  console.log('Rows', totalRows, 'Cols', totalColumns, 'Perimeter', totalPerimeter);
  console.log('Visible', totalVisible);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function checkIfTreeVisible(row, col, height) {
  let left = [];
  treeGrid[row].forEach(function(heightVal, index) {
    if(index < col) {
      left.push(heightVal);
    }
  });
  // console.log('left', left);
  if(compareHeightVal(left, height)) {
    console.log('Tree is visible to left');
    return true;
  }

  let right = []
  treeGrid[row].forEach(function(heightVal, index) {
    if(index > col) {
      right.push(heightVal);
    }
  });
  // console.log('right', right);
  if(compareHeightVal(right, height)) {
    console.log('Tree is visible to right');
    return true;
  }

  let up = []
  treeGrid.forEach(function(treeRow, rowIndex) {
    if(rowIndex != row && rowIndex < row){
      up.push(treeRow[col]);
    }
  });
  // console.log('up', up);
  if(compareHeightVal(up, height)) {
    console.log('Tree is visible up');
    return true;
  }

  let down = []
  treeGrid.forEach(function(treeRow, rowIndex) {
    if(rowIndex != row && rowIndex > row){
      down.push(treeRow[col]);
    }
  });
  // console.log('down', down);
  if(compareHeightVal(down, height)) {
    console.log('Tree is visible down');
    return true;
  }

  return false;
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