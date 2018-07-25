const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true }
)
.then(() => {
        console.log('Connected to database')
})
.catch((e) => {
        console.log('Connection failed')
        console.log(e);
    }
);

module.exports = {mongoose}; 
