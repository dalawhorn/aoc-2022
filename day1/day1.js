#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day1input.txt";
let elfData = [];
let fileStream = fs.createReadStream(inputFile);

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');
  // console.log(dataArr);

  dataArr.forEach(function(val, index) {
    if(val === '' || elfData.length === 0) {
      // console.log('new elf');
      elfData.push({
        'elfId': elfData.length + 1,
        'calorieCount': 0
      });
    }
    
    if(val !== '') {
      let current_elf = elfData[elfData.length -1];
      // console.log("current", current_elf, parseInt(val));
      elfData[elfData.length -1].calorieCount = current_elf.calorieCount + parseInt(val);
      // console.log(elfData[elfData.length -1]);
    }
  });

  elfData.sort(function(a, b) {
    if(a.calorieCount < b.calorieCount) {
      return -1;
    }
    else if(a.calorieCount > b.calorieCount) {
      return 1;
    }
    else {
      return 0;
    }
  });

  console.log("Elf carrying the most calories: ", elfData[elfData.length - 1]);

  let topThreeTotalCalories = 0;
  for(let i = 1; i <= 3; i++) {
    topThreeTotalCalories = topThreeTotalCalories + elfData[elfData.length - i].calorieCount;
  }

  console.log('Top 3 Calorie Count: ', topThreeTotalCalories);
});

fileStream.on('error', function(error) {
  console.log(error);
});