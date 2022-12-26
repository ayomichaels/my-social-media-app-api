const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
mongoose.set('debug', true);


const dbConnect = (uri)=>{
    mongoose.connect(uri, ()=>{
        console.log(`database conneced successfully`);
    })
}

module.exports = { dbConnect }