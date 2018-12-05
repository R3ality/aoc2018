'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().trim();
console.time('duration');

//input = 'dabAcCaCBAcCcaDA';

input = input.split('').reduce((accum, current) => {
    if (accum.length === 0) accum.push(current); // first char
    else {
        let prev = accum[accum.length-1];
        if (current === current.toUpperCase()) {
            if (current.toLowerCase() === prev) accum.pop(); // xX reaction, remove previous
            else accum.push(current);
        }
        else if (current === current.toLowerCase()) {
            if (current.toUpperCase() === prev) accum.pop(); // Xx reaction, remove previous
            else accum.push(current);
        }
        else accum.push(current); // no reaction, add current
    }
    return accum;
}, []).join('');

console.log('Agter reactions, the polymer contains', input.length ,'units');
console.timeEnd('duration');
