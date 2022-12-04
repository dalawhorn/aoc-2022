#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day3input.txt";
let fileStream = fs.createReadStream(inputFile);

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphaArr = alpha.split('');
let prioritySum = 0;
let prioritySumPart2 = 0;

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  let workingRows = [];

  dataArr.forEach(function(row, index) {
    //Part 1 Code
    const totalItems = row.length;
    const compartmentItemsTotal = totalItems/2;
  
    const itemsCompartment1 = row.substring(0, compartmentItemsTotal);
    const itemsCompartment1Arr = itemsCompartment1.split('');
    const itemsCompartment2 = row.substring(compartmentItemsTotal);
    const itemsCompartment2Arr = itemsCompartment2.split('');
    
    let compartmentIntersection = itemsCompartment1Arr.filter(function(x){
      return itemsCompartment2Arr.includes(x);
    })

    prioritySum += (alphaArr.findIndex(letter => letter == compartmentIntersection[0]) + 1);

    //Part 2 Code
    workingRows.push(row.split(''));
    if(((index+1) % 3) === 0) {
      //Do comparison after getting 3 rows.
      //NGL I gave up and copy/pasted this line from SO to compare 3 arrays at the same time, need to go back and learn how it really works...
      const commonVal = workingRows.reduce((a, b) => a.filter(c => b.includes(c)));

      prioritySumPart2 += (alphaArr.findIndex(letter => letter == commonVal[0]) + 1);;
      workingRows = [];
    }
  });
});

fileStream.on('end', function() {
  console.log("Priority Sum Part 1: ", prioritySum);
  console.log("Priority Sum Part 2: ", prioritySumPart2);
});

fileStream.on('error', function(error) {
  console.log(error);
});