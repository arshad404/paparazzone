const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

var app = express();

// ejs set

// load models
require('./models/User');
require('./models/stories');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');
const index = require("./routes/index");
const stories = require("./routes/stories");

// load keys
const keys = require('./config/keys');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) 

// map global promise
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(keys.mongoURI,{
    // useMongoClient: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//set static path
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use("/", index);
app.use('/auth', auth);
app.use('/stories', stories);


const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`server started on port ${port}`);
}); 