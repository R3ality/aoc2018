'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().split(/\r\n|\n|\r/);

let ids = [];
for (let needle of input) {
    for (let hay of input) {
        if (needle == hay) break; // skip itself
        let matchChars = 0;
        hay.split('').forEach((char, i) => {
            if (char == needle[i]) matchChars++;
        });
        if (matchChars == (needle.length-1)) { // if all but 1 char matches
            ids.push(needle, hay);
            console.log('Following have just 1 char difference: "' + needle + '", "' + hay + '"');
            break;
        }
    }
    if (ids.length == 2) break; // we found the 2 IDs we're looking for
}

let solution = [];
ids[0].split('').forEach((char, i) => {
    if (char == ids[1][i]) solution.push(char); // collect matching chars
});
console.log('Solution is "' + solution.join('') + '"');
