const express = require('express')
const createHttpError= require('http-errors')
const morgan= require('morgan')
const mongoose = require ('mongoose')
require('dotenv').config()



const app= express()
app.use(morgan('dev'));

app.get('/', (req, res, next)=>{
    res.send('Working');
})

mongoose.connect('mongodb+srv://ankit:adminankit@cluster0.qyao6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

//error handler with status
app.use((req, res, next)=>{
    next(createHttpError.NotFound())
})
app.use((error, req, res, next)=>{
    error.status= error.status || 500
    res.status(error.status);
    res.send(error)
})



//local host port
const PORT= process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))