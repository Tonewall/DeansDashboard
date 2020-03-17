console.log("\n\n[Server] Starting server on port 5001")

const app = require('express')();
const body_parser = require('body-parser');

// add body parser for post method
app.use(body_parser.json());    // json encoded
app.use(body_parser.urlencoded({extended: true}));  // url encoded

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// add router
require('./router')(app);

// Open connection from external ip
app.listen(5001, '0.0.0.0');