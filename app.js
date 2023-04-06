const express = require('express');

const expressLayouts = require('express-ejs-layouts');


const app = express();
const port = 3000;

//use ejs
app.set('view engine', 'ejs');
 app.use(expressLayouts);

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
    // res.sendFile('./about.html', {root : __dirname})
    // res.sendFile('./index.html', {root : __dirname})
    //we have to name the file to .ejs
    res.render('about', {
        layout: 'main',
        title: "about us"
    })
})
app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'main',
        title: "contact"
    })
})
app.get('/product/:id/category/:catid', (req, res) => {
// res.send(`this is produk number${req.params.id}, and ${req.params.catid} `)
res.render('product', {
    layout:'main',
    title: "for sale"
})
})

//middleware routes
app.use( (req, res) => {
res.status(404)
res.render('404', {
    layout: 'main',
    root : __dirname})
})

//listening on http://localhost
app.listen(port, (err, res) => {
    console.log(`listening from port ${port}`);
})