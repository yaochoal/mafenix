//Initialazing express
const express = require('express');
const app = express();

//module required
const morgan = require('morgan');
const bodyParser = require('body-parser');


//Settings
app.set('port', process.env.PORT || 3000);//process.env.PORT is an environment variable

app.listen(app.get('port'), () => {
    console.log('server on port');
});

//middleware
app.use(morgan('dev')); //shows requests in console -development-
app.use(bodyParser.json());//understand request

//routes
require('./routes/userRoutes.js')(app);