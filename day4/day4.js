#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day4/day4input.txt";
let fileStream = fs.createReadStream(inputFile);

let pairsThatContain = [];

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    const sectionPairs = row.split(',');
    const pair1 = sectionPairs[0].split('-');
    const pair2 = sectionPairs[1].split('-');

    if(rangePairContains(pair1, pair2)) {
        pairsThatContain.push(sectionPairs);
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed...
  console.log("Total pairs that fully contain each other: ",pairsThatContain.length);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function rangePairContains(pair1, pair2) {
    if(parseInt(pair1[0]) >= parseInt(pair2[0])) {
        if(parseInt(pair1[1]) <= parseInt(pair2[1])) {
            return true;
        }
    }

    if(parseInt(pair1[0]) <= parseInt(pair2[0])) {
        if(parseInt(pair1[1]) >= parseInt(pair2[1])) {
            return true;
        }
    }

    return false;
}