var fs = require('fs');
var request = require('request');

var xml2js = require('xml2js');

var express = require('express');
var router = express.Router();

// GET index

router.get('/', function (req, res, next) {
    
    res.locals.page_title = "Football News";
    
    var parser = new xml2js.Parser();
    
    request('http://www.bbc.co.uk/sport/football/rss.xml', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            parser.parseString(body, function (err, result) {

                channel = result.rss.channel;

                for (i = 0; i < channel.length; i++) {

                    items = channel[i].item;

                    res.locals.news_items = items;

                }

            });

        }

        next();
        
    });
}, function (req, res) {
    
    //set cache control headers
	res.set("Cache-Control","max-age=86400");

    res.render('news' , { 
  		hostname: req.hostname,
  		website: req.website
  	});
    
});

// GET norwich

router.get('/norwich', function (req, res, next) {
    
    res.locals.page_title = "Norwich City News";
    
    var parser = new xml2js.Parser();
    
    request('http://www.bbc.co.uk/sport/football/teams/norwich-city/rss.xml', function (error, response, body) {

        if (!error && response.statusCode == 200) {

            parser.parseString(body, function (err, result) {

                channel = result.rss.channel;

                for (i = 0; i < channel.length; i++) {

                    items = channel[i].item;

                    res.locals.news_items = items;

                }

            });

        }

        next();
        
    });
}, function (req, res) {
    
    //set cache control headers
	res.set("Cache-Control","max-age=86400");

    res.render('news' , { 
  		hostname: req.hostname,
  		website: req.website
  	});
    
});

module.exports = router;