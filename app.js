const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://nekineki:test1234@klaster.ftrzt8x.mongodb.net/nodeDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

//register view engine
//.set = configure app settings
app.set('view engine', 'ejs'); //ejs will be used in creating templates
//app.set('views', 'myviews'); if folder with views is not named 'views'

//app.listen(3000);


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //middleware for parsing data (takes url encoded data and parse it into object)
app.use(morgan('dev')); //dev dictates how it will be formatted what we log in console

app.get('/add-blog', (req, res) => {
    //new instance of blog model
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => { //fires a callback fn when promise resolves
            res.send(result) //send back result and see it in browser
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/single-blog', (req, res) => {
    Blog.findById('64426aa95f2d714c1253bf40')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

//it will fire fn on every request because middleware is on top
/* app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
}); */

app.get('/', (req, res) => { //2nd argument = fn takes two objects
    res.redirect('/blogs');
    /*     const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];//dummy */
    //    res.send('<p>home page</p>'); //express auto do res.setHeader('Content-Type', 'text/html'); auto set status code
    //    res.sendFile('./views/index.html', { root: __dirname}); //2nd argument option object root of project
    // redirected to /blogs    res.render('index', { naslov: 'Home', blogs }); //knows as render view (take view, render it and send it to browser(app.set)), 2nd parametar data (object)

});

app.get('/about', (req, res) => { //2nd argument = fn takes two objects

    //    res.send('<p>about page</p>'); //express auto do res.setHeader('Content-Type', 'text/html'); auto set status code
    //    res.sendFile('./views/about.html', { root: __dirname}); 
    res.render('about', { naslov: 'About' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { naslov: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {
    //console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { naslov: 'Create a new Blog' });
});

//.use = use this function for every single request
/* app.use((req, res) => { //.use will fire fn for every request only if request reaches line 26
    //  res.status(404).sendFile('./views/404.html', { root: __dirname});
    res.status(404).render('404', { naslov: '404' });
});  */