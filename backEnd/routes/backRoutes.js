app.get('/:shortUrl', async (req, res) => {

    const shortUrl = await ShortUrl.findOne({
        short: req.params.shortUrl
    });

    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);

});

app.get('/aboutMe', (req, res) => {

    res.send({
        title: 'About Me',
        msg: 'I am a Web Dev',
        rname: 'Vipin kumar Dinkar',
        name: 'NicestRudeGuy'
    })
});
