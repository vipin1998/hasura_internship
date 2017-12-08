var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var app = express();


app.use(morgan('dev'));
var authors = require('./routes/authors');

app.use('/authors', authors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());


app.get('/',function(req,res)
{
    res.send('Hello World - Vipin');
})

app.post('/setCookie',function(req,res)
{
    var name  = req.body.name;
    var age = req.body.age;
    var name_age = name + age;
    var cookie = req.cookies.nameAge;
    if (cookie === undefined)
    {
        res.cookie('nameAge',name_age);
        res.send('new Cookie has been set');
    }
    else
    {
        console.log('cookie exists', cookie);
        res.send('Cookie already set');
    }
});

app.get('/clearCookie' , function(req,res)
{
    var cookie = req.cookies.nameAge;
    console.log(cookie);
    if (cookie === undefined)
    {
        res.send('Cookie Already deleted');
    }
    else
    {
        res.clearCookie('nameAge');
        res.send('Cookie has Been cleared');
    }
})


app.listen(8080,function()
{
    console.log('server listen on port 8080');
})