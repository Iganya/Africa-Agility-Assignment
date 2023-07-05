// import the module
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
// create a function using the async and await try and catch
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error);
    }
}
// export your database connection so it can be accessible at the entry point
module.exports = connectDB;