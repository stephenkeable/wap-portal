var express = require('express');
var app = express();

var fs = require('fs');
var request = require('request');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var output_news = "";

app.get('/', function (req, res) {
    
    request('http://www.bbc.co.uk/sport/football/teams/norwich-city/rss.xml', function (error, response, body) {

      if (!error && response.statusCode == 200) {

          parser.parseString(body, function (err, result) {

              channel = result.rss.channel;

              for (i = 0; i < channel.length; i++) {

                  items = channel[i].item;

                  for (i = 0; i < items.length; i++) {

                    output_news = output_news + "<p><strong>" +items[i].title[0] + '</strong><br>' + items[i].description[0] + '</p>';   

                  }
                  
                  res.send(output_news);

              }

        });

      }

    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;