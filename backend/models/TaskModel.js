const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {//Mongoose automatically adds it with a unique ObjectId.
        title:{type:String,require:true},
        description:{type:String}
    },{timestamps:true}

);
module.exports= mongoose.model("Task",TaskSchema)
 