var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const http = require('http');
var path = require('path');
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

const options = {
  hostname: 'httpbin.org',
  port: 80,
  path: '/deny',
  method: 'GET'
};

app.get('/robots.txt', function (req, res) {
    r = http.request(options, function(resp)
    {
        output = ''
        console.log('STATUS: ' + resp.statusCode)
        resp.on ('data', function(chunk)
        {
            console.log('A new chunk: ', chunk)
            output += chunk
        });
        resp.on ('end', function()
        {
            res.send(output);
            console.log ('End GET Request')
        });
    })
    r.on('error', function(err)
    {
        console.log('Error: ', err)
    })
    r.end()
  //res.sendFile(path.join(__dirname, 'ui', 'robots.txt'));
});

app.get('/index.html' , function(req,res)
{
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
})

app.post('/input' ,function(req,res)
{
    var input = req.body.input;
    console.log(input);
    res.send(input);
});

app.post('/setCookie',function(req,res)
{
    var name  = req.body.name;
    var age = req.body.age;
    var name_age = name + age;
    var cookie = req.cookies.nameAge;
    if (cookie === undefined)
    {
        res.cookie('nameAge',name_age,{ maxAge: 900000, httpOnly: true });
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

app.get('/getcookies' , function(req,res)
{
    var cookie = req.cookies.nameAge;
    console.log(cookie);
    if (cookie === undefined)
    {
        res.send('Cookie Does not exist');
    }
    else
    {
        res.send(cookie);
    }
})




app.listen(8080,function()
{
    console.log('server listen on port 8080');
})