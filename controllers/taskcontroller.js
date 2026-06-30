const Task = require("../models/Task");

exports.getTasks = async (req,res)=>{
//   try{
//     const  filter = {
//          status : req.query.status,
//          priority : req.query.priority,
//     }
//     if(filter.status || filter.priority){
//        const tasks = await Task.find({
//         filter
//        });
//        res.status(200).json({ success: true,
//             data: tasks });
//     }
//     else{
// const tasks = await Task.find();
//         res.status(200).json({ success: true,
//             count: tasks.length,
//             data: tasks });
//     }
// }
try{
    // const filter = {};  // it contains all user no parsing
    const filter = { user: req.user._id };
    const allowedstatus = [ 'pending' , 'completed'];

    if(req.query.status){
  if (!allowedstatus.includes(req.query.status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status only allowed pending  / completed"
        });
    }
            filter.status = req.query.status;
    }

    const allowedpriority = ['low' , 'medium' , 'high'];

  if (req.query.priority) {

    if (!allowedpriority.includes(req.query.priority)) {
        return res.status(400).json({
            success: false,
            message: "Invalid priority  , only allowed is low/medium/high"
        });
    }

    filter.priority = req.query.priority;
}

if (req.query.search) {
    filter.title = {
        $regex: req.query.search,
        $options: "i"
    };
}

const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;

const skip = (page - 1) * limit;
const sort = req.query.sort || "-createdAt";

     const tasks = await Task.find(filter).sort(sort).skip(skip)
    .limit(limit);
       res.status(200).json({ success: true,
          count : tasks.length ,
            data: tasks });
}
    
catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



exports.getTaskById = async (req, res) => {
    try {
        // const task = await Task.findById(req.params.id); jo parameter aayega sab ka tha
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        //  const task = await Task.create(req.body);
const taskData = {
            ...req.body,   //  conation all thing in a one http request also with userid : someone's id can be send 
            user: req.user._id  // overwrites the id which is used to login , now it is more secure
        };

        const task = await Task.create(taskData);

        res.status(201).json({ success: true,
             message: "Task created inside controller", 
             data: task
             });
    } catch (error) {
        res.status(500).json({ success: false,
            msg : "Failed to create Task" ,
            error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {

        // const task = Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // });
        const task = await Task.findOneAndUpdate(
    {
        _id: req.params.id,
        user: req.user._id
    },
    req.body,
    {
        new: true,
        runValidators: true
    }
);

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
    //    const task = await Task.findByIdAndDelete(req.params.id);
const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

if (!task) {
            return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
        }

        await task.deleteOne();

        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};