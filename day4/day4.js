#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day4/day4inputtest.txt";
let fileStream = fs.createReadStream(inputFile);

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    //Do stuff with file data...
    console.log(row);
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed...
});

fileStream.on('error', function(error) {
  console.log(error);
});