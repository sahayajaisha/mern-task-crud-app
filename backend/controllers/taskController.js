

const mongoose = require("mongoose");

const taskModel = require('../models/TaskModel')

//create a task post
const createTask = async(req,res) => {
  const {title,description}= req.body; 
  
  try{
    const task = await taskModel.create({title,description})

    console.log('ADD Successfully'+task);
return res.status(200).json({"message":"AddSuccessfully" });
  
  } catch(e){
    res.status(400).json({error:e.message})
   
  }
};

const getTask = async(req,res)=>{
  try{
    const tasks = await taskModel.find({});
    res.status(200).json(tasks)
  }
  catch(e){
    res.status(400).json({error:e.message})

  }
}



//get/params-id
const getSingleTask = async(req,res) =>{
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
{
  return res.status(404).json({message:'Task Not Found'})
}
try{
const singleTask = await taskModel.findById(id)
res.status(200).json(singleTask)
} catch (e){
  res.status(400).json({error:e.message}); 
}
};

const deleteTask = async(req,res)=>{
  const {id}= req.params;
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message:'Task Not Found'})
  }
  try{
    const task = await taskModel.findByIdAndDelete(id)

    console.log('DeletedSuccessfully',task)

  
return res.status(200).json({ message: "DeletedSuccessfully" });
    
  }catch(e){
    res.status(400).json({error:e.message})
  }
}




const updateTask = async(req,res)=>{
  const {id}= req.params;
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404)({message:'Task Not Found'})
  }
  try{
    const task = await taskModel.findByIdAndUpdate({
    _id:id
    },
    {
        ...req.body  // updating data
        
    },
    { new: true } );  //returns the updated document


  console.log('Updated Data',task);
    return res.status(200).json({ message: "UpdatedSuccessfully" });
  }
  

  catch(e){
    res.status(400).json({error:e.message})
  }
}

module.exports = {createTask,getTask,getTask,getSingleTask,deleteTask,updateTask};