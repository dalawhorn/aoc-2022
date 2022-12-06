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
    let currentFourteen = [];
    let lastCharIndex = 0;
    let lastCharIndexFourteen = 0;
    let isUnique = false;
    let isUniqueFourteen = false;

    for(let i=0; i < characters.length; i++) {
      if(currentFour.length < 4) {
        currentFour.push(characters[i]);
        lastCharIndex = i;
      }

      if(currentFourteen.length < 14) {
        currentFourteen.push(characters[i]);
        lastCharIndexFourteen = i;
      }
      
      if(currentFour.length === 4 && !isUnique) {
        // Check for duplicate chars here...
        const unique = [...new Set(currentFour)];
        if(unique.length === 4) {
          // All characters are unique. We have a winner!
          isUnique = true;
        }

        // If there are duplicate chars, remove first char on current arr so next char can be added.
        if(!isUnique) {
          currentFour.shift();
        }
      }

      if(currentFourteen.length === 14 && !isUniqueFourteen) {
        // Check for duplicate chars here...
        const uniqueFourteen = [...new Set(currentFourteen)];
        if(uniqueFourteen.length === 14) {
          // All characters are unique. We have a winner!
          isUniqueFourteen = true;
        }

        // If there are duplicate chars, remove first char on current arr so next char can be added.
        if(!isUniqueFourteen) {
          currentFourteen.shift();
        }
      }

      if(isUnique && isUniqueFourteen) {
        break;
      }
    }

    if(isUnique){
      console.log("Last Char With Unique Prev 4: ", lastCharIndex+1);
    }
    else {
      console.log("No unique sequence was found");
    }

    if(isUniqueFourteen){
      console.log("Last Char With Unique Prev 14: ", lastCharIndexFourteen+1);
    }
    else {
      console.log("No unique sequence was found for prev 14.");
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
});

fileStream.on('error', function(error) {
  console.log(error);
});
