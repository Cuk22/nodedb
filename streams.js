const fs = require("fs");

const readStream = fs.createReadStream('./docs/blog2.txt', {encoding: 'utf8'}); //1st argument = from where to read data, 2nd argument option object encode to readable format

/* readStream.on('data', (chunk) => { //.on = event listner (listening to a data event on readStream), everytime we get chuck of data we fire callback fn and get access to that chuck of data
    console.log('----- NEW CHUNK -----')
    console.log(chunk);
});
 */
const writeStream = fs.createWriteStream('./docs/blog3.txt') //1st argument where do we want to write to

/* readStream.on('data', (chunk) => { //everytime we get a new piece of data from readStream we got to line 15 then line 16
    console.log('----- NEW CHUNK -----')
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk); //everytime we get a new chuck write that chunk to new file
});
 */

//piping must be from readable stream to writable one

readStream.pipe(writeStream);