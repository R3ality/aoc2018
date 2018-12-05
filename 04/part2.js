'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().trim().split(/\r\n|\n|\r/);

// parse the input and sort by time
input = input.map((line) => {
    let {groups: {year, month, day, hour, minute, guardId, observation}} = (/^\[(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}) (?<hour>\d{2}):(?<minute>\d{2})\] (Guard #(?<guardId>[0-9]{1,4}) )?(?<observation>[a-z].*)$/).exec(line);
    return { dateTime: new Date(year, month, day, hour, minute), guard: parseInt(guardId), observation: observation };
}).sort((a, b) => a.dateTime - b.dateTime);

let storedId, sleepingSince = null;
let sleepStats = {};
let longestSleep = { guard: null, minutes: 0 };
input.forEach(e => {
    (e.guard) ? storedId = e.guard : e.guard = storedId;
    if (e.observation === 'begins shift') return;
    else if (e.observation === 'falls asleep') {
        sleepingSince = e.dateTime.getMinutes();
        if (!sleepStats[e.guard]) sleepStats[e.guard] = { total: 0, minutes: new Array(60).fill(0) };
    }
    else if (e.observation === 'wakes up') {
        for (let i = sleepingSince; i < e.dateTime.getMinutes(); i++) {
            sleepStats[e.guard].total++;
            sleepStats[e.guard].minutes[i]++;
        }
        // if this guard has slept the most so far, remember it
        if (longestSleep.minutes < sleepStats[e.guard].total) {
            longestSleep.minutes = sleepStats[e.guard].total;
            longestSleep.guard = e.guard;
        }
    }
});

let arr = [];
for (var key in sleepStats) {
    if (!sleepStats.hasOwnProperty(key)) return;
    let sorted = Array.from(sleepStats[key].minutes).sort((a, b) => b - a);
    let usuallyAsleep = sleepStats[key].minutes.indexOf(sorted[0]);
    arr.push({ guard: key, minute: usuallyAsleep, times: sorted[0] });
}
arr.sort((a, b) => b.times - a.times);

console.log('Most popular time to sleep is minute', arr[0].minute, 'during which guard', arr[0].guard, 'slept', arr[0].times, 'times');
console.log('Puzzle solution is thus', (arr[0].minute * arr[0].guard));