var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  request('http://localhost:3000/users', function(error, response, body){
    var users = JSON.parse(body).users;
    if(!error && response.statusCode == 200){
      request('http://localhost:3000/alliances', function(error, response, body){
        var alliances = JSON.parse(body).alliances;
        if(!error && response.statusCode == 200){
          for (var i = 0; i < users.length; i++) {
             var user = users[i];
            for (var j = 0; j < alliances.length; j++) {
              var alliance = alliances[j];
              if(user.alliance_id == alliance.id) {
                          user.alliance_id = alliance.name;
                          console.log( user.alliance_id + " " + alliance.id);
                          
              }              
            }                  
          }
              res.render('users', 
                { 
                  users: users
                });
        }else{
          res.render('Error');
        }
      })
    }else{
      res.render('Error');
    }
  })
});

/* GET One User Infos. */
router.get('/:id', function(req, res, next) {
  var id = (req.params.id);
  request('http://localhost:3000/users/' + id, function(error, response, body){
    var user = JSON.parse(body).user;
    if(!error && response.statusCode == 200){
      request('http://localhost:3000/alliances', function(error, response, body){
        var alliances = JSON.parse(body).alliances;
        if(!error && response.statusCode == 200){
            for (var j = 0; j < alliances.length; j++) {
              var alliance = alliances[j];
              if(user.alliance_id == alliance.id) {
                          user.alliance_id = alliance.name;
               }              
            }                  
          
              res.render('OneuserInfo', 
                { 
                  user: user
                });
        }else{
          res.render('Error');
        }
      })
    }else{
      res.render('Error');
    }
  })
});

module.exports = router;
