const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');  

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

// session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


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

            // Save the userId in the session
            req.session.userId = result.insertedId;

            res.redirect('/signup_success.html');
        } catch (error) {
            console.error('Error inserting signup:', error);
            res.status(500).send('Error saving signup information.');
        }
    });
    
// Route to serve profile page with user data
app.get('/profile', async (req, res) => {
    const userId = req.session.userId; // Get userId from session

    if (!userId) {
        return res.redirect('/signup.html'); // If user is not signed in, redirect to signup page
    }

    try {
        const userProfileCollection = db.collection('user_profile');
        const user = await userProfileCollection.findOne({ _id: new require('mongodb').ObjectId(userId) });

        if (user) {
            res.send(user); // Send the user data as JSON to be handled by the front end
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
