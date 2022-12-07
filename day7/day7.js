#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day7/day7input.txt";
let fileStream = fs.createReadStream(inputFile);

// Array where each value is the current folder path so if we're in dir /a/b ["/","a","b"]
let pwd = [];
let part1Sum = 0;

// Object representation of the file/folder structure in the input file.
let fileTree = {
  '/': {
    size: 0,
    folders: {
      // Values have the same obj structure as this root folder
    },
    files: []
    // [{name: 'fileName', size: 1234}]
  }
}

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    //Do stuff with each row of file data here...
    // console.log(row);
    const rowVals = row.split(' ');
    // console.log(rowVals);

    if(rowVals[0] === "$") {
      // Row is a command
      console.log('Command');
      if(rowVals[1] === "cd") {
        // Change directory
        if(rowVals[2] === "..") {
          // Change dir back up one level
          pwd.pop();
        }
        else {
          // Change dir down to folder
          pwd.push(rowVals[2]);

          // Check if directory exists in our fileTree, if not add it.
          checkDirsExists(pwd, fileTree);
        }

        // console.log(pwd);
      }
    }
    else if(rowVals[0] === 'dir') {
      // Row is a directory
      console.log('Directory');
    }
    else if(!isNaN(rowVals[0])) {
      // Row starts with number is a file value
      console.log('File');
      addFileToDir(pwd, fileTree, rowVals[1], rowVals[0]);
    }
  });
});

fileStream.on('end', function() {
  //Do stuff after file processed here...
  console.log(fileTree);

  calculatePart1DirSizeTotal('/', fileTree);
  console.log("Part 1 sum: ", part1Sum);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function checkDirsExists(directories, fileTree, index = 0) {
  if(fileTree[directories[index]] === undefined) {
    console.log('directory does not exist, create');
    fileTree[directories[index]] = {
      size: 0,
      folders: {
        // Values have the same obj structure as this root folder
      },
      files: []
        // [{name: 'fileName', size: 1234}]
    }
  }
  else {
    console.log('directory exists ignore');
  }

  if(directories[index+1] !== undefined) {
    console.log('moving to next sub dir');
    checkDirsExists(directories, fileTree[directories[index]].folders, index+1);
  }
  else {
    console.log('no sub dirs');
  }
}

function addFileToDir(pwd, fileTree, fileName, fileSize, pwdIndex = 0) {
  fileTree[pwd[pwdIndex]]['size'] += parseInt(fileSize);

  if(pwd.length > pwdIndex + 1) {
    addFileToDir(pwd, fileTree[pwd[pwdIndex]]['folders'], fileName, fileSize, pwdIndex+1);
  }
  else {
    // console.log(fileTree[pwd[pwdIndex]]);
    fileTree[pwd[pwdIndex]]['files'].push({
      size: fileSize,
      name: fileName
    });
  }

}

function calculatePart1DirSizeTotal(folder, fileTree) {
  let currentFolder = fileTree[folder];
  if(currentFolder['size'] <= 100000) {
    part1Sum += currentFolder['size'];
  }

  if(Object.keys(currentFolder['folders']).length > 0) {
    Object.keys(currentFolder['folders']).forEach(function(val, index) {
      let subFolder = currentFolder['folders'];
      calculatePart1DirSizeTotal(val, subFolder);
    });
  }
}