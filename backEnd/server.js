const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');



const mongoDB = 'mongodb://localhost/urlShortener';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.use(morgan('common'));
app.use(helmet());
/* app.use(cors({
    origin: 'https://localhost:3000'
})); */

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.post('/shorturls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
});


app.post('/su', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('http://localhost:3000');
});

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    // res.send({ shortUrls });
    res.render('index', { shortUrls: shortUrls });
});

app.get('/apidata', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    // res.send({ shortUrls });
    res.send(shortUrls);
});





app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        msg: 'I am a Web Dev',
        rname: 'Vipin kumar Dinkar',
        name: 'NicestRudeGuy'
    });
    /*  res.send({
         title: 'About Me',
         msg: 'I am a Web Dev',
         rname: 'Vipin kumar Dinkar',
         name: 'NicestRudeGuy'
     }) */
});

app.get('/aboutMe', (req, res) => {

    res.send({
        title: 'About Me',
        msg: 'I am a Web Dev',
        rname: 'Vipin kumar Dinkar',
        name: 'NicestRudeGuy'
    })
});


app.get('/:shortUrl', async (req, res) => {

    const shortUrl = await ShortUrl.findOne({
        short: req.params.shortUrl
    });

    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);

});


app.listen(process.env.PORT || 5000);