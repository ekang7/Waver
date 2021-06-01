const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const connectionString = "mongodb+srv://ekang21:Databasesmolder424@cluster0.thj6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
        console.log('Connected to Database'); 
        const db = client.db('WaverDatabase');
        const customermessagesCollection = db.collection('customermessages');
        app.listen(3000, function() {
            console.log('listening on 3000');
        });
        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/customer', (req, res) => {
            db.collection('customermessages').find().toArray()
            .then(results => {
            console.log(results);
            })
            .catch(error => console.error(error));
            res.sendFile(__dirname + '/customer.html');
        });
        app.get('/waiter', (req, res) => {
            db.collection('customermessages').find().toArray()
            .then(results => {
                res.render('index.ejs', {customermessages: results});
            console.log(results);
            })
            .catch(error => console.error(error));
              
        });
       
        app.post('/customermessage', (req, res) => {
            customermessagesCollection.insertOne(req.body)
              .then(results => {
                res.redirect('/');
              })
              .catch(error => console.error(error));
          });
})
.catch(error => console.error(error));
