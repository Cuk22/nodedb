const fs = require("fs");

/* fs.readFile("./docs/blog1.txt", (err, data) => { //1st argument string = relative path, 2nd argument fn (err, data = stuff that we read from file)  
if (err) {
    console.log(err);
}
    console.log(data.toString());
});
 */

/* //if file does not exist, it creates one
fs.writeFile('./docs/blog1.txt', 'hello world', () => { //1st argument = relative path, 2nd argument = text we want to write, 3rd argument callback fn
    console.log('file was written');
});
 */


/* //if folder does exists = delete it, if it does not exists = create it
if (!fs.existsSync('./assets')){
fs.mkdir('./assets', (err) => { //1st argument path+new dir name
    if (err) {
        console.log(err);
    }
    console.log('folder created');
})
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('folder deleted');
    })
};
 */
if (fs.existsSync('./docs/deleteme.txt')) { //looks for file
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('file deleted');
    })
};