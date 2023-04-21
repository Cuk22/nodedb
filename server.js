const http = require('http');
const fs = require('fs');
const _ = require('lodash');


//store the instance of the server in server constant
const server = http.createServer((req, res) => { //takes callbank fn as argument (callback fn will run everytime a  request comes in)
    //console.log(req.url, req.method);

    

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;//301 - permanently moved
            res.setHeader('Location', '/about'); //redirect 
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }


    fs.readFile(path, (err, data) => {
        //fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end(); //keeps request away from hanging if there is an error
        } else {
            /*  res.write(data);
                res.end(); */
            res.end(data) //if we are sending only one thing into response
        }
    });


    /*  res.write('<head><link rel ="styleseet" href="#"></head>');
        res.write('<p>hello ninjas</p>');
        res.write('<p>hello again ninjas</p>');
        res.end(); */
});


server.listen(3000, 'localhost', () => { //port number, host name, fn (fires when we start listening)
    console.log('listening for requests on port 3000')
}) //port number, host name

//req - comes loaded with info (URL, req.type) 
//res - send response to user in browser