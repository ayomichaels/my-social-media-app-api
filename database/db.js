const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const dbConnect = (uri)=>{
    mongoose.connect(uri, ()=>{
        console.log(`database conneced successfully`);
    })
}

module.exports = { dbConnect }