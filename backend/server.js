const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();

const app = express();

const port = 5000  || process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true } );

const connection = mongoose.connection;
connection.once('open', function () {
    console.log('Sucessfully connected to MongoDB!');  
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);





app.listen(port, function () {
    console.log("Server running on port: " + port + " !")
  })