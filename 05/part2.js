'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().trim();
console.time('duration');

//input = 'dabAcCaCBAcCcaDA';

let lengths = [];
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
for (let j = 0; j < alphabet.length; j++) { // loop alphabet
    let copy = input.replace(new RegExp('[' + alphabet[j] + ']', 'gi'), ''); // remove units of this type
    
    copy = copy.split('').reduce((accum, current) => {
        if (accum.length === 0) accum.push(current); // first char
        else {
            let prev = accum[accum.length-1];
            if (current === current.toUpperCase()) {
                if (current.toLowerCase() === prev) accum.pop(); // xX reaction, remove previous
                else accum.push(current); // no reaction, add current
            }
            else if (current === current.toLowerCase()) {
                if (current.toUpperCase() === prev) accum.pop(); // Xx reaction, remove previous
                else accum.push(current); // no reaction, add current
            }
        }
        return accum;
    }, []);
    
    lengths.push(copy.length);
}

console.log('Shortest polymer would be', lengths.sort()[0]);
console.timeEnd('duration');