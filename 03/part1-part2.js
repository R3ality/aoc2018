'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().trim().split(/\r\n|\n|\r/);

input = input.map((line) => { // parse the input instructions
    // match the parts we care about and convert to ints
    let claim = line.match(/#([0-9]*) @ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)/).slice(1).map(Number);
    // lets use arr.shift() instead of arr[x] because why not, we're cool
    return { id: claim.shift(), posx: claim.shift(), posy: claim.shift(), dimx: claim.shift(), dimy: claim.shift() }
});

// weave the fabric
let fabric = new Array(1000).fill('.').map(() => new Array(1000).fill(0));

let overlaps = 0;
let goodclaims = {};
input.forEach((claim, i) => {
    let fine = true; // fine until this claim has not overlapped with any others
    for (let y = claim.posy; y < (claim.posy + claim.dimy); y++) {
        for (let x = claim.posx; x < (claim.posx + claim.dimx); x++) {
            let sqinch = fabric[y][x];
            if (sqinch == 0) { // if sqinch is not claimed
                fabric[y][x] = claim.id; // mark it with claim ID
                if (fine) goodclaims[claim.id] = true; // remember claim ID
            }
            else if (sqinch > 0) { // elif sqinch is already claimed
                fabric[y][x] = -1; // unmark it
                overlaps++;
                delete goodclaims[claim.id]; // forget this claim
                delete goodclaims[sqinch]; // also forget the claim it overlapped with
                fine = false;
            }
        }
    }
});

console.log("Overlapping square inches:", overlaps);
console.log("Claim ID that does not overlap:", Object.keys(goodclaims)[0]);