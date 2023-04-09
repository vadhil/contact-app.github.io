const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser')
const { loadContact, findContact, addContact } = require('./utils/contacts');
const port = 4000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.urlencoded( { extended: true } ));

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







app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'main',
        title: "form add contact" 
    })})

// add data contact
app.post('/contact', (req, res) => {
    addContact(req.body);
    console.log(req.body);
    res.redirect('/contact');})










app.get('/contact/:name', (req, res) => {
    const contact= findContact(req.params.name);
    res.render('detail', {
        layout: 'main',
        title: "halaman detail contact",
        contact})})

// res.send(`this is produk number${req.params.id}, and ${req.params.catid} `)
app.get('/product/:id/category/:catid', (req, res) => {
res.render('product', {
    layout:'main',
    title: "for sale"})})

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