#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day5/day5input.txt";
let fileStream = fs.createReadStream(inputFile);

const crates = [];
const moves = [];
let cratesOnTop = "";

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    // console.log(row);

    if(row !== '') {
      //Row is not the break between the crates and the moves
      if(row.indexOf('move') === 0) {
        // Row is a move row
        // console.log('move row');
        const moveRegexPattern = /move\s{1}(\d+)\s{1}from\s{1}(\d+)\s{1}to\s{1}(\d+)/g;
        const moveMatches = [...row.matchAll(moveRegexPattern)];

        moves.push({
          moveCrateTotal: moveMatches[0][1],
          moveFromCol: moveMatches[0][2],
          moveToCol: moveMatches[0][3]
        });
      }
      else if(row.indexOf(' 1') === 0) {
        // Row is the numeric label for crate stack
        // console.log('crate numbers row');
      }
      else if(row.indexOf('[') !== -1) {
        // Row has a [ so we'll assume it is a crate row.
        // console.log('crate row');
        const crateRegexPattern = /(\s*)(\[([A-Z])\]+)(\s*)/g;
        const crateMatches = [...row.matchAll(crateRegexPattern)];

        crateMatches.forEach(function(crateMatch, index){
          let colArrIndex = 0;

          if(crateMatch.index == 0 && crateMatch[1].length > 0) {
            colArrIndex = ((crateMatch[1].length/4));
          }
          else {
            colArrIndex = ((crateMatch.index/4));
          }
          
          if(crates[colArrIndex] == null) {
            crates[colArrIndex] = [];
          }

          crates[colArrIndex].push(crateMatch[3]);
        });

      }
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
  console.log("Moves: ", moves);
  console.log("Crates: ", crates);

  moves.forEach(function(move, index) {
    let i = 0;
    while(i < move.moveCrateTotal) {
      let moveCrate = crates[move.moveFromCol-1].shift();
      crates[move.moveToCol-1].unshift(moveCrate);
      i++;
    }
  });

  console.log("Moved crates: ", crates);

  crates.forEach(function(stack, index) {
    cratesOnTop += stack[0];
  })

  console.log("Crates on top: ", cratesOnTop);
});

fileStream.on('error', function(error) {
  console.log(error);
});
