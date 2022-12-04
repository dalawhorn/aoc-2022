#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day3input.txt";
let fileStream = fs.createReadStream(inputFile);

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphaArr = alpha.split('');
let prioritySum = 0;

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
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
  });
});

fileStream.on('end', function() {
  console.log("Priority Sum: ", prioritySum);
});

fileStream.on('error', function(error) {
  console.log(error);
});