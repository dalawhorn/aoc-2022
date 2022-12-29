#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day10/day10input.txt";
let fileStream = fs.createReadStream(inputFile);

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    //Do stuff with each row of file data here...
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
});

fileStream.on('error', function(error) {
  console.log(error);
});
