const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
require('dotenv').config();
const { exec } = require('child_process');
exec('npm run build', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
const app = express()
const port = 80

app.use(cors())
app.use(express.json())
const contactRouter = require('./routes/contacts')

app.use('/contacts', contactRouter)
app.use(express.static(path.join(__dirname,'client','build')))
app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));

//routers
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