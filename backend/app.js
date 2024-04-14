require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const IngredientRouter = require('./routes/ingredients');
const Ingredient = require('./models/Ingredient');
const RecipesRouter = require('./routes/recipes');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./config/passport.js')(passport); 
const authRoutes = require('./routes/auth');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'your_secret_key',  
  resave: false,            
  saveUninitialized: false,   
  cookie: { secure: 'auto' }  
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

mongoose.connect('mongodb+srv://battle32:ICgHZSdFUYdbyerU@doughflow.sfu1fld.mongodb.net/?retryWrites=true&w=majority&appName=DoughFlow', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("We're connected!");
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/ingredients', IngredientRouter);
app.use('/recipes', RecipesRouter);

app.get('/ingredients', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render('ingredients', { ingredients });
});


app.post('/ingredients', async (req, res) => {
    try {
        const { name, cost, quantity } = req.body;

        if (!name || !cost || !quantity) {
            res.status(400).send("All fields are required.");
            return;
        }

        const costNumber = parseFloat(cost);
        if (isNaN(costNumber)) {
            res.status(400).send("Invalid cost. Please enter a valid number.");
            return;
        }

        const newIngredient = new Ingredient({
            name,
            cost: costNumber,
            quantity
        });

        await newIngredient.save();

        res.redirect('/ingredients');
    } catch (error) {
        res.status(500).send("Failed to save ingredient. Error: " + error.message);
    }
});

app.use(session({ secret: 'verysecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use('/users', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
