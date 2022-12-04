#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day4/day4input.txt";
let fileStream = fs.createReadStream(inputFile);

let pairsThatContain = [];
let pairsThatOverlap = [];

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    const sectionPairs = row.split(',');
    const pair1 = sectionPairs[0].split('-');
    const pair2 = sectionPairs[1].split('-');

    //part1
    if(rangePairContains(pair1, pair2)) {
        pairsThatContain.push(sectionPairs);
        //part2 - if the pair contains then it's overlapped, skip the next check.
        pairsThatOverlap.push(sectionPairs);
        return;
    }

    //part2 - rest of ranges go through here..
    if(rangePairOverlaps(pair1, pair2)) {
        pairsThatOverlap.push(sectionPairs);
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed...
  console.log("Total pairs that fully contain each other: ",pairsThatContain.length);
  console.log("Total pairs that overlap: ",pairsThatOverlap.length);
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

function rangePairOverlaps(pair1, pair2) {
    pair1 = [parseInt(pair1[0]), parseInt(pair1[1])];
    pair2 = [parseInt(pair2[0]), parseInt(pair2[1])];

    const all = pair1.concat(pair2);
    const allSort = all.sort();

    if( (pair2[0] >= pair1[0] && pair2[0] <= pair1[1]) 
        || (pair2[1] >= pair1[0] && pair2[1] <= pair1[1]) 
        || (pair1[0] >= pair2[0] && pair1[0] <= pair2[1]) 
        || (pair1[1] >= pair2[0] && pair1[1] <= pair2[1]) ){
        return true;
    }

    return false;
}