const express = require("express");

require("dotenv").config();
const mongoose = require('mongoose'); 
const cors = require('cors');  //import cros and npm install cors

const app = express();


const taskRoutes = require("./route/taskRoute");




app.get('/',(req,res) => {
    console.log('Hello')
    res.send('hii')
}
); 

// Middleware to enable CORS
app.use(cors());


//middleware
app.use((req,res,next) => {
console.log('path' , req.path , 'method' , req.method);
next();
})


app.use(express.json());
//DB COnnection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
    console.log('DB connected successfully and listening  to' , process.env.PORT);
});
})
.catch((error) => console.log(error));


//baseroute
app.use("/api/tasks", taskRoutes);
console.log('Starting application...');
