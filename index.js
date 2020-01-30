// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

app = express();

app.use(bodyParser.urlencoded({extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {


    var fiat = req.body.currency;
    var crypto = req.body.crypto;
    var hm = req.body.amount;

    console.log(hm);

    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

    var options = {
        url:baseURL,
        method:"GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: hm
        },

    };

    request(options, function(err, response, body) {
        
        var data = JSON.parse(body);
        var price = data.price;

        var currentDate = data.time;


        res.write("<p> The current date is " + currentDate + "</p>");

        res.write("<h1>The cost of "+ hm + " " + crypto + " coins will cost " + price + " " + fiat + "s</h1>");

        res.send();

    });
});

app.listen(3000, function() {
    console.log("You are listening to port 3000");
});

