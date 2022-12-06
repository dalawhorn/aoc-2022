#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day6/day6input.txt";
let fileStream = fs.createReadStream(inputFile);

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    const characters = row.split('');
    
    let currentFour = [];
    let lastCharIndex = 0;
    let isUnique = false;
    for(let i=0; i < characters.length; i++) {
      if(currentFour.length < 4) {
        currentFour.push(characters[i]);
        lastCharIndex = i;
      }
      
      if(currentFour.length === 4) {
        // Check for duplicate chars here...
        const unique = [...new Set(currentFour)];
        if(unique.length === 4) {
          // All characters are unique. We have a winner!
          isUnique = true;
          break;
        }

        // If there are duplicate chars, remove first char on current arr so next char can be added.
        currentFour.shift();
      }
    }

    if(isUnique){
      console.log("Last Char With Unique Prev 4: ", lastCharIndex+1);
    }
    else {
      console.log("No unique sequence was found");
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
});

fileStream.on('error', function(error) {
  console.log(error);
});
