const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const cors=require('cors');
const userRoute=require("./routes/UserDetails");
// const userImage=require('./routes/userImage');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());




app.use('/details',userRoute)
// app.use('/documentimg',userImage)



app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})