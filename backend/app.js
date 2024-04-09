"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const recipes_1= __importDefault(require("./routes/recipes"));
const app = (0, express_1.default)();
exports.default = app;
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'Client')));
app.use(express_1.default.static(path_1.default.join(__dirname, "node_modules")));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/recipes', recipes_1.default);

function saveRecipe(name, ingredients, steps) {
    // Logic to save the recipe in the database
    console.log(`Saving recipe: ${name}`);
    // Simulating database save 
    return new Promise((resolve, reject) => {
        // After database operations, resolve or reject the promise
        setTimeout(() => resolve(`Recipe ${name} saved successfully`), 1000);
    });
}

app.post('/recipes', (req, res) => {
    const { name, ingredients, steps } = req.body;

    // Validate the form data 
    if (!name || !ingredients || !steps) {
        return res.status(400).send('All fields are required');
    }

    // Save the recipe data in the database
    saveRecipe(name, ingredients, steps)
        .then(result => {
            console.log(result);
            // Redirect to the home page or a confirmation page after successful save
            res.redirect('/');
        })
        .catch(error => {
            console.error('Error saving recipe:', error);
            res.status(500).send('Error saving recipe');
        });
});
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});
//# sourceMappingURL=app.js.map