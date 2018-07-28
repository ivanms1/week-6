require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const port = process.env.PORT || 3001;
const users = require('./routes/users');
const website = require('./routes/websites');


const app = express();

app.use(logger('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

require('./passport/')(passport);

app.use('/users', users);
app.use('/website', website);

app.get('/', (req, res) => {
    res.json({ msg: 'Connected' });
});

app.listen(port, () => console.log(`Listening on port ${port}`))