const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authroutes");
const taskroutes = require('./routes/Taskroutes');
const app = express();

const errorHandler = require("./middlewares/errormiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use('/api/tasks' , taskroutes);

app.get('/' , (req,res)=>{
    res.status(200).json({
        success : "true" ,
        msg : "Task manager API is running ",
    });
});

app.use(errorHandler);

module.exports = app ;