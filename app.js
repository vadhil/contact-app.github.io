const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const { loadContact } = require('./utils/contacts');
const port = 3000;

//use ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
//to make our image and css available, bcos express secure our assets
app.use(express.static('public'));


//the web route
//we have to name the file to .ejs and use res.render so dont need to use views, i guess

app.get('', (req, res) => {
    res.render('home', {
        layout: 'main',
        title: "home"
    })
})

app.get('/index', (req, res) => {
    const mahasiswa = [
        {
            nama : 'fadhil',
            age : 25
        },
        {
            nama : 'ahmad',
            age : 24
        },
        {
            nama : 'mukhsin',
            age : 25
        }
    ] 
    res.render('index', {
        layout: 'main',
        mahasiswa, 
        title: "pengumuman" })
})
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'main',
        title: "about us"
    })
})
app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'main',
        title: "contact",
        contacts
    })
    
})

// res.send(`this is produk number${req.params.id}, and ${req.params.catid} `)
app.get('/product/:id/category/:catid', (req, res) => {
res.render('product', {
    layout:'main',
    title: "for sale"
})
})

//middleware routes/ catch the err route with app.use 
app.use( (req, res) => {
res.status(404)
res.render('404', {
    layout: 'main',
    root : __dirname})
})


app.listen(port, (err, res) => {
    console.log(`listening from port ${port}`);
})

// console.log(loadContact());