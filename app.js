const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session'); //optional for flash notifications 
const cookieParser = require('cookie-parser'); //optional
const flash = require('connect-flash'); //optional
const { body, validationResult, check } = require('express-validator');
const app = express();
const bodyParser = require('body-parser')
const { loadContact, findContact, addContact, checkDuplicate } = require('./utils/contacts');
const port = 4000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.urlencoded( { extended: true } ));

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000},
    secret:'secret',
    resave: true, 
     saveUninitialized: true
}))
app.use(flash());

app.post(
    '/contact',[
        body('name').custom((value)=>{
        const duplicate = checkDuplicate(value);
        if (duplicate) {
            throw new Error('nama contact sudah ada')
        }
        return true;
    }),
    check('phone', 'its not a valid number').isMobilePhone('id-ID'),
    check('email', 'its not a valid email').isEmail(),],
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('add-contact', {
            layout: 'main',
            title: "add contact",
            errors: errors.array()
        })
      } else {
        addContact(req.body);

        req.flash('msg', 'data has been updated successfully')
        res.redirect('/contact');
      }
    },
  );













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
        contacts,
        msg: req.flash('msg'),
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