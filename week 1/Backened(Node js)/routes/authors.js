var express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
var authorRoutes = express.Router();
authorRoutes.use(bodyParser.json());

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/users',
  method: 'GET'
};

authorRoutes.get('/users' , function(req,res)
{
    r = https.request(options, function(resp)
    {
        output = ''
        username = []
        console.log('STATUS: ' + resp.statusCode)
        resp.on ('data', function(chunk)
        {
            console.log('A new chunk: ', chunk)
            output += chunk
        });
        resp.on ('end', function()
        {
            var users = JSON.parse(output);
            for(var i=0;i<users.length;i++)
            {
                username.push(users[i]["name"]);
            }
            res.json({
                "message" : 
                {
                    "data" : username
                }
            });
            console.log ('End GET Request')
        });
    })
    r.on('error', function(err)
    {
        console.log('Error: ', err)
    })
    r.end()
});

const option = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/posts',
  method: 'GET'
};

authorRoutes.get('/posts' , function(req,res)
{
    r = https.request(option, function(resp)
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
            res.json({
                "message" : 
                {
                    "data" : output
                }
            });
            console.log ('End GET Request')
        });
    })
    r.on('error', function(err)
    {
        console.log('Error: ', err)
    })
    r.end()
});

authorRoutes.get('/counter' ,function(req ,res)
{
    var users = '';
    var posts = '';
    r = https.request(options, function(resp)
    {
        console.log('STATUS: ' + resp.statusCode)
        resp.on ('data', function(chunk)
        {
        //    console.log('A new chunk: ', chunk)
            users += chunk
            
        });
        resp.on ('end', function()
        {
            console.log ('End GET Request')
        });
    })
    r.on('error', function(err)
    {
        console.log('Error: ', err)
    })
    r.end()

    p = https.request(option, function(resp)
    {
        console.log('STATUS: ' + resp.statusCode)
        resp.on ('data', function(chunk)
        {
        //    console.log('A new chunk: ', chunk)
            posts += chunk
        });
        resp.on ('end', function()
        {
            var dict = [];
            posts = JSON.parse(posts);
            users = JSON.parse(users);
            for(var i=0;i<users.length ;i++)
            {
                var username = users[i]["name"];
                var user_id = users[i]["id"];
                var count = 0;
                for(var j =0;j<posts.length ; j++)
                {
                    if(posts[j]["userId"] == user_id)
                    {
                        count++;
                    }
                }
                dict.push({
                    key:   username,
                    value: count
                });
            }
            res.json({
                "message" : {
                    "data" : dict
                }
            })
            console.log ('End GET Request')
        });
    })
    p.on('error', function(err)
    {
        console.log('Error: ', err)
    })
    p.end()
});



module.exports = authorRoutes;