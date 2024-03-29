const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const app = express()
const port = 4000
const path = require('path');

//*********** Developement */
const corsOptions = {
    origin: 'https://marwen-pfe-recrutement-dashboard.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

require('dotenv').config()
require('./passport/bearer')
require('./common/init_scripts/int_script')
require('./database/connect')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://marwen-pfe-recrutement-dashboard.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.options('*', cors(corsOptions));
// app.use(cors(corsOptions));

//************ Testing */
// require('dotenv').config()
// require('./passport/bearer')
// require('./common/init_scripts/int_script')
// require('./database/connect')
// app.use(cors())

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
const reponseApi = require('./routes/reponseApi');
const evaluationApi = require('./routes/evaluationApi');
const dashStatsApi = require('./routes/dashStatsApi');

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.use('/api', authapi)
app.use('/api', userApi)
app.use('/api', consultantApi)
app.use('/api', candidatApi)
app.use('/api', evaluateurApi)
app.use('/api', questionApi)
app.use('/api', formulaireApi)
app.use('/api', reponseApi)
app.use('/api', evaluationApi)
app.use('/api', dashStatsApi)


app.listen(port, () => {
    console.log('App is listening on port ' + port);
})