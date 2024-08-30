const express = require('express');
const router = express.Router()



const {createTask,getTask,getSingleTask,deleteTask,updateTask} = require('../controllers/taskController');


router.post('/',createTask);

 router.get('/',getTask);
   //getTask callback
 router.get('/:id',getSingleTask);

   
 router.delete('/:id',deleteTask);
 router.patch('/:id',updateTask);


module.exports = router;