const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
require('dotenv').config();

const app = express()
const port = 80

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'client','build')))

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
).catch(e=>console.log(e));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, ()=>{
    console.log("Server started at port "+port)
})