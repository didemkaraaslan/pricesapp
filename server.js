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


const f = require('./server/helpers/helpers');


var docRef = db.collection('shoesCollection').doc('shoesDocument');

Promise.all([
        f.fetchShoesFromAyakkabiDunyasi(),
        f.fetchShoesFromHM(),
        // f.fetchShoesFromTrendyol()
        //f.fetchShoesFromSportive()
    ])
    .then(results => {
        [ AyakkabiDunyasi, HM] = results;
        Array.prototype.push.apply(AyakkabiDunyasi, HM);
        console.log(AyakkabiDunyasi);
        
        var setAda = docRef.set({
            data : AyakkabiDunyasi
    }); 
        
    })
    .catch(err => {
        console.log(err);
    })






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