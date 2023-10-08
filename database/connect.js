const mongoose = require('mongoose')
const developementURI = process.env.DEV_URI
const testURI = process.env.DB_URI
mongoose.set('strictQuery', false);
mongoose.connect(testURI).then(success => {
    console.log('Successfuly connected to database');
}).catch(error => {
    console.log('error connecting to database');
})