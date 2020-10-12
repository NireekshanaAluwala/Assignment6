var express = require('express');
var app = express();
var port = 8000;
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var mongourl = "mongodb://localhost:27017";
var cors = require('cors');
var db;
app.use(cors());

app.get('/health',(req,res) => {
    res.send("Api is working")
});
app.get('/',(req,res) => {
    res.send(` <a href="http://localhost:8000/mealtype" target="_blank">MealType</a> <br/> `)
})

//mealtype
app.get('/mealtype',(req,res) => {
    db.collection('mealType').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongourl,(err,connection) => {
    if(err) throw err;
    db = connection.db('assignment6');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})