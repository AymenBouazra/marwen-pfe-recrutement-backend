const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const app = express()
const port = 4000
const path = require('path');

const allowedOrigins = ['https://marwen-pfe-recrutement-dashboard.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

require('dotenv').config()
require('./passport/bearer')
require('./common/init_scripts/int_script')
require('./database/connect')
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.urlencoded({ limit: '100mb', extended: false }))
app.use(express.json({ limit: '100mb' }))
app.use(bodyParser.json({ limit: 100 * 1024 * 1024 }))
app.use(bodyParser.urlencoded({ limit: 100 * 1024 * 1024, extended: true, parameterLimit: 50000 }))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(session({ resave: true, secret: process.env.JWT_SECRET, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const authapi = require('./routes/authApi');
const userApi = require('./routes/userApi');
const consultantApi = require('./routes/consultantApi');
const candidatApi = require('./routes/candidatApi');
const evaluateurApi = require('./routes/evaluateurApi');
const questionApi = require('./routes/questionApi');
const formulaireApi = require('./routes/formulaireApi');

app.use('/', authapi)
app.use('/', userApi)
app.use('/', consultantApi)
app.use('/', candidatApi)
app.use('/', evaluateurApi)
app.use('/', questionApi)
app.use('/', formulaireApi)


app.listen(port, () => {
    console.log('App is listening on port ' + port);
})