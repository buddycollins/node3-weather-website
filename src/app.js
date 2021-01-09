const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { response } = require('express');



const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Define paths for Express config
app.use(express.static(publicDirectoryPath));

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael Collins',
        createdBy: 'Charlie Cat'
    });
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Michael Collins',
        createdBy: 'Charlie Cat'
    });
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Michael Collins',
        helpText: 'This is some help text.',
        createdBy: 'Charlie Cat'
    });
})

app.get('/weather', (req, res) =>{

    if (!req.query.address) {

        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, coordinates) => {

        if (error) { return res.send({ error }); } 
        
        forecast(coordinates, (error, report) => {
            if (error) {
                return res.send({ error });
            } else {
                res.send({
                    address: req.query.address,
                    report
                }); 
            }
        });
    });

});

app.get('/products', (req, res) => {

    if (!req.query.search) {

         return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({

        products: []
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Collins',
        errorMessage: '404: Article not found',
        createdBy: 'Charlie Cat'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Michael Collins',
        errorMessage: '404: Page not found',
        createdBy: 'Charlie Cat'
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});