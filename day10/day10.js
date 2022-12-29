#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day10/day10input.txt";
let fileStream = fs.createReadStream(inputFile);

let x = 1;
let totalCycles = 0;
let signalAnalyze = 20;
let signalAnalyzeIncrement = 40;
let signalStrengthSum = 0;

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    let rowParams = row.split(' ');

    if(rowParams[0] === "noop") {
      totalCycles++;
      checkCycle();
    }
    else if(rowParams[0] === "addx") {
      for(let addCycles = 0; addCycles < 2; addCycles++) {
        totalCycles++;
        checkCycle();
      }
      
      x += Number(rowParams[1]);
    }
  });
});

fileStream.on('end', function() {
  console.log('total cycles: ', totalCycles);
  console.log('x: ', x);
  console.log('Signal strenght sum: ', signalStrengthSum);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function checkCycle() {
  if(totalCycles === signalAnalyze) {
    let signalStrength = signalAnalyze * x;
    signalStrengthSum += signalStrength;
    console.log("Analyze Signal: " + signalAnalyze);
    console.log("Signal Strength", signalStrength);
    signalAnalyze += signalAnalyzeIncrement;
  }
}
