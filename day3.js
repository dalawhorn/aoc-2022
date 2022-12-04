#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day3input.txt";
let fileStream = fs.createReadStream(inputFile);

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    //Do something with line of file data here...
  });
});

fileStream.on('end', function() {
  //Do something after all lines in file have been read...
});

fileStream.on('error', function(error) {
  console.log(error);
});