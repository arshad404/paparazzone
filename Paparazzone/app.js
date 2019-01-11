const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get('/', (req,res)=>{
    res.send("it works!");
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`server started on port ${port}`);
});