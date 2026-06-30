const  express  = require('express');
const router = express.Router();
const protect = require("../middlewares/authmiddleware"); 
const { 
    getTasks, 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskcontroller');

router.use(protect)

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

// router.get('/:id' ,(req, res) => {
//     res.status(200).json({ success: true, message: `Fetch task with ID: ${req.params.id}` });
// });



module.exports = router;
