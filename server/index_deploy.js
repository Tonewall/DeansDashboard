const app = require('express')();
const body_parser = require('body-parser');

var fs = require('fs');

const session = require('express-session')
var sess = {
  secret: 'any thought on dashboard project secret string?',
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    //secure: true  // required to allow 'none' sameSite
  }, // allows session cookie to be delivered to xss client side
}

// use session
app.use(session(sess))

// add body parser for post method
app.use(body_parser.json());    // json encoded
app.use(body_parser.urlencoded({extended: true}));  // url encoded

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://dashboard.police.gatech.edu");
    res.header("Access-Control-Allow-Credentials", 'true')  // Needed to enable cookie transfer
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// add router
require('./router')(app);

app.listen(5001, '0.0.0.0')
