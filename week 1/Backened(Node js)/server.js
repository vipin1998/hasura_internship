var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/',function(req,res)
{
    res.send('Hello World - Vipin');
})

app.listen(8080,function()
{
    console.log('server listen on port 3000');
})