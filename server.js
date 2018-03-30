const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const async = require('async');
const admin = require('firebase-admin');
const app = express();

var serviceAccount = require('./PriceTrackingSystem-af50ccbfc727.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
 
 var db = admin.firestore();
 var collectionRef = db.collection("shoesCollection");

const f = require('./server/helpers/helpers');


app.get('/shoes', (req, res) =>{
    Promise.all([
          f.fetchShoesFromAyakkabiDunyasi(),
          //f.fetchShoesFromHM(),
         // f.fetchShoesFromRovigo(),
          f.fetchShoesFromTrendyol(),
          f.fetchShoesFromSportive(),
          f.fetchShoesFrom1V1Y()
    ])
    .then(results => {
     
        [ AyakkabiDunyasi, Trendyol, Sportive, _1V1Y] = results;

        let products = AyakkabiDunyasi.concat(Trendyol, Sportive, _1V1Y);
        var batch = db.batch();
        products.forEach(function(element) {
            var docRef = collectionRef.doc();
            batch.set(docRef, element);
        });

        batch.commit().then(function () {
            console.log(products.length);
            res.json(products);
        });
    })
    .catch(err => {
        console.log(err);
    })

});



// API file for interacting with Firebase Realtime Database
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


// API location
app.use('/api', api);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));