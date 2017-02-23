var express = require('express');
var request = require('request');
var router = express.Router();

/* GET alliances listing. */
router.get('/', function(req, res, next) {
      request('http://localhost:3000/alliances', function(error, response, body){
        var alliances = JSON.parse(body).alliances;
        if(!error && response.statusCode == 200){                    
              res.render('alliances', 
                { 
                  alliances: alliances
                });
        }else{
          res.render('Error');
        }
      })
});

/* GET One Alliance Infos. */
router.get('/:id', function(req, res, next) {
  var id = (req.params.id);
  request('http://localhost:3000/alliances/' + id, function(error, response, body){
    var alliance = JSON.parse(body).alliance;
    if(!error && response.statusCode == 200){
      res.render('OneallianceInfo', 
                { 
                  alliance: alliance
                });      
    }else{
      res.render('Error');
    }
  }) 
});

module.exports = router;


          