#!/usr/bin/env node

const fs = require('fs');

const inputFile = "./day11/day11inputtest.txt";
let fileStream = fs.createReadStream(inputFile);

let monkeys = [];
let currentMonkeyIndex = 0;
// 20 rounds in part 1...
// const numRounds = 20;
const numRounds = 10000;

fileStream.on('data', function(chunk) {
  const fileData = chunk.toString();
  const dataArr = fileData.split('\n');

  dataArr.forEach(function(row, index) {
    if(row === "") {
      return;
    }

    let rowTrim = row.trim();

    if(rowTrim.indexOf('Monkey') === 0) {
      const rowSplit = rowTrim.split(' ');
      const indexSplit = rowSplit[1].split(':');
      const newMonkeyIndex = indexSplit[0];
      
      currentMonkeyIndex = newMonkeyIndex;
      monkeys.push({
        itemsInspected: 0
      });
    }

    if(rowTrim.indexOf('Starting items') === 0) {
      const startingSplit = rowTrim.split(': ');
      const startingItems = startingSplit[1].split(', ');
      let startingItemsInt = [];

      for(i=0; i<startingItems.length; i++) {
        startingItemsInt.push(parseInt(startingItems[i]));
      }
      
      monkeys[currentMonkeyIndex]['startingItems'] = startingItemsInt;
    }

    if(rowTrim.indexOf('Operation') === 0) {
      const operationSplit = rowTrim.split(': ');
      const operation = operationSplit[1];
      
      monkeys[currentMonkeyIndex]['operation'] = operation;
    }

    if(rowTrim.indexOf('Test') === 0) {
      const testSplit = rowTrim.split('divisible by ');
      const test = testSplit[1];
      
      monkeys[currentMonkeyIndex]['ifTest'] = parseInt(test);
    }

    if(rowTrim.indexOf('If') === 0) {
      const ifSplit = rowTrim.split('throw to monkey ');
      const ifCase = ifSplit[1];

      if(!monkeys[currentMonkeyIndex].hasOwnProperty('ifCase')) {
        monkeys[currentMonkeyIndex]['ifCase'] = [];
      }
      
      monkeys[currentMonkeyIndex]['ifCase'].push(parseInt(ifCase));
    }
  });
});

fileStream.on('end', function() {
  // console.log(monkeys);

  let round = 1;
  while(round <= numRounds) {
    console.log('round', round);

    for(let m=0; m<monkeys.length; m++) {
      console.log('monkey', m);
      let currentMonkey = monkeys[m];
  
      for(let s=0; s<currentMonkey['startingItems'].length; s++) {
        monkeys[m]['itemsInspected']++;
        let item = currentMonkey['startingItems'][s];
        console.log('inspects', item);
        
        const newWorryLevelItem = calculateNewWorryLevel(item, currentMonkey['operation']);
        console.log('new worry level', newWorryLevelItem);
  
        //Dividing by 3 is part 1 only...
        // const worryCalc = Math.floor(newWorryLevelItem/3);
        const worryCalc = newWorryLevelItem;
        console.log('bored worry level', worryCalc);
        
        let toMonkey = 0;
        if(worryCalc % currentMonkey['ifTest'] === 0) {
          console.log('is divisible by ', currentMonkey['ifTest']);
          toMonkey = currentMonkey['ifCase'][0];
        } 
        else {
          console.log('is not divisible by ', currentMonkey['ifTest']);
          toMonkey = currentMonkey['ifCase'][1];
        }
  
        console.log('thrown to', toMonkey);
  
        monkeys[toMonkey]['startingItems'].push(worryCalc);
      }
  
      monkeys[m]['startingItems'] = [];
    }

    round++;
  }

  let inspectTotals = monkeys.map(function(value, index){
    return value['itemsInspected'];
  });

  let inspectTotalsSort = inspectTotals.sort(function(a, b){
    if(a > b) {
      return -1;
    }
    else if(a < b) {
      return 1;
    }
    else {
      return 0;
    }
  });

  const monkeyBusiness = inspectTotalsSort[0] * inspectTotalsSort[1];
  console.log('monkey business', monkeyBusiness);
});

fileStream.on('error', function(error) {
  console.log(error);
});

function calculateNewWorryLevel(old, operation) {
  const matches = operation.match(/^new \= \S+ (\*|\+) (\S+$)/);
  const val1 = old;
  const operator = matches[1];
  let val2 = matches[2]

  if(val2 === "old") {
    val2 = old;
  }
  else {
    val2 = parseInt(val2);
  }

  if(operator === "*") {
    return val1 * val2;
  }
  else if(operator === "+") {
    return val1 + val2;
  }
}
