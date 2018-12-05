'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8').toString().trim().split(/\r\n|\n|\r/);

/*
input = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`.split(/\r\n|\n|\r/);
*/

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

console.log('Guard', longestSleep.guard, 'was asleep the longest with', longestSleep.minutes, 'minutes total');

let sorted = Array.from(sleepStats[longestSleep.guard].minutes).sort((a, b) => b - a);
let usuallyAsleep = sleepStats[longestSleep.guard].minutes.indexOf(sorted[0]);

console.log('He\'s most likely to be asleep at minute', usuallyAsleep, 'so puzzle solution is', (longestSleep.guard * usuallyAsleep));
