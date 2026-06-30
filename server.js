const app = require('./app');
require('dotenv').config();
const { connectDB } = require("./config/db");

const PORT = process.env.PORT;

const startserver = async () => {
    try{
        await connectDB();
        app.listen(PORT , ()=>{
            console.log(`server connected at ${PORT}`);
        });
    }
    catch(err){
        console.log(`error at starting server : ${err.message}`);
        process.exit(1);
    }
};

startserver();

