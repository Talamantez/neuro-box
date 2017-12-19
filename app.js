/*
 * Socket IO stuff
 */

var attention = 0;
var testAttention;
// Get Data at 1Hz, DO NOT USE THIS TIMER IN PRODUCTION - 
setInterval(function() {
    console.log('running socket.emit("getData")');
    socket.emit('getData');
    refreshFrontEnd();
}, 2000);
const socket = io('http://127.0.0.1:4000');

const sayData = function(data) {

    console.log('signal: (zero is good, 200 is bad)');
    data._source._buffers[1][0] ? console.log(data._source._buffers[1][0]["signal"]) : console.log('signal not found');

    console.log('eeg:');
    data._source._buffers[0][0] ? console.log(data._source._buffers[0][0]["eeg"]) : console.log('eeg not found');

    console.log('attention:');
    data._source._buffers[3][0] ? console.log(data._source._buffers[3][0]["attention"]) : console.log('attention not found');

    console.log('meditation:');
    data._source._buffers[2][0] ? console.log(data._source._buffers[2][0]["meditation"]) : console.log('meditation not found');
}

const start = new Date();
var stream = Kefir.withInterval(1000, emitter => {
    const time = new Date() - start;
    if (time < 100000) {
        socket.emit('getData');
    } else {
        emitter.end(); // end the stream
    }
});
stream.log();

var refreshAttention = function(data) {
    console.log('data:');
    console.dir(data);
    console.log(data._source._buffers[3][0]);
    if (data._source._buffers[3][0]) {
        if (data._source._buffers[3][0]["attention"]) {
            console.log('attention found');
            attention = data._source._buffers[3][0]["attention"];
            if (attention < 10) {
                console.log('attention 0 reading dumped');
            } else {
                console.log('attention reading:');
                console.log(attention);
            }
            // drawCubes(geometry, attention);
        }
    } else {
        console.log('ERR: refreshAttention(data), data not found ');
    }
    if (data._source._buffers[3][0]) {
        if (data._source._buffers[3][0]["meditation"]) {
            console.log('meditation found');
            attention = data._source._buffers[3][0]["meditation"];
            if (attention < 10) {
                console.log('meditation 0 reading dumped');
            } else {
                console.log('meditation reading:');
                console.log(meditation);
            }
            // drawCubes(geometry, attention);
        }
    } else {
        console.log('ERR: refreshAttention(data), data not found ');
    }
}

function refreshFrontEnd() {
    drawCubes(geometry, attention);
    console.log('refreshFrontEnd running');
}

socket.on('data', refreshAttention);