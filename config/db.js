//  Database connection
const mongoose = require("mongoose");
async function connectDB(){
   try{ 
   await  mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected succesfully");
   }
    catch(err){
        console.log(err);
         process.exit(1);
        
    }
}

module.exports = {
    connectDB,
}
