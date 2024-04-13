require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const IngredientRouter = require('./routes/ingredients');
const RecipesRouter = require('./routes/recipes');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./config/passport.js')(passport); 
const authRoutes = require('./routes/auth');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(session({ secret: 'verysecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//app.use('/login', authRoutes);
//app.use('/register', authRoutes);
app.use(express.urlencoded({ extended: false }));
app.use('/users', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
