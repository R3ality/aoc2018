'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().split(/\r\n|\n|\r/);

let solution = { three: 0, two: 0 };
input.forEach(str => {
    str = str.split('').sort();
    let multiples = { three: 0, two: 0 };
    for (var i = 0; i < str.length; i++) {
        if (str[i] == str[i+1]) { // if char matches next one
            if (str[i] == str[i+2]) { // if char also matches one after thar
                multiples.three++;
                i = i+2; // skip index
            } else {
                multiples.two++;
                i = i+1; // skip index
            }
        }
    }
    if (multiples.two > 0) solution.two++;
    if (multiples.three > 0) solution.three++;
});

console.log(solution.two +' * '+ solution.three  +' = '+ (solution.two * solution.three));
