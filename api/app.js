const express = require('express');
const accountRoutes = require('./routes/account');
const recipeRoutes = require('./routes/recipe');

const camelCaseDeep = require('camelcase-object-deep');
const { setupAuth, ensureAuthenticated } = require('./auth.js');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'LITRules@!',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        originalJson.call(this, camelCaseDeep(data));
    };
    next();
});

setupAuth(app);

app.use('/api/account', accountRoutes);
app.use('/api/recipe', recipeRoutes);

app.listen(4000, () => {
  console.log(`API is running on http://localhost:4000`);
});
