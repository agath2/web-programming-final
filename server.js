const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const uri = 'mongodb+srv://agathayanghi:testTESTtest@clusterdemo.hfznyhl.mongodb.net/?retryWrites=true&w=majority&appName=Clusterdemo';
const client = new MongoClient(uri);

let db;

// Connect to MongoDB Atlas
async function connectDB() {
    try {
        await client.connect();
        db = client.db('virtual_vet');
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB Atlas connection error:', error);
    }
}
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

// Handle form submission
app.post('/signup', async (req, res) => {
        const { name, email, password, petName, petBreed, petAge } = req.body;

        try {
            const signupCollection = db.collection('user_profile');
            await signupCollection.insertOne({
                name: name,
                email: email,
                password: password,
                petInfo: {
                    name: petName,
                    breed: petBreed,
                    age: parseInt(petAge)
                },
                createdAt: new Date()
            });
            res.redirect('/signup_success.html');
        } catch (error) {
            console.error('Error inserting signup:', error);
            res.status(500).send('Error saving signup information.');
        }
    });
    

// Start server
app.listen(PORT, () => {
    console.log(`Heroku is using port: ${process.env.PORT}`);
});
