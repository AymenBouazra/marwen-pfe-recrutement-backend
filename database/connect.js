const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI).then(success => {
    console.log('Successfuly connected to database');
}).catch(error => {
    console.log('error connecting to database');
})