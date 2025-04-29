const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT;

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
            const result = await signupCollection.insertOne({
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

            // Redirect to signup_success.html with the user ID in the query string
            res.redirect(`/signup_success.html?id=${result.insertedId}`);
        } catch (error) {
            console.error('Error inserting signup:', error);
            res.status(500).send('Error saving signup information.');
        }
    });
    

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

// route to fetch user by ID
app.get('/api/user', async (req, res) => {
    const userId = req.query.id;

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        const signupCollection = db.collection('user_profile');
        const user = await signupCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});