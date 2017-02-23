var express = require('express');
var request = require('request');
var router = express.Router();

/* GET characters listing. */
router.get('/', function(req, res, next) {
  request('http://localhost:3000/characters', function(error, response, body){
    var characters = JSON.parse(body).characters;
    if(!error && response.statusCode == 200){
      request('http://localhost:3000/users', function(error, response, body){
        var users = JSON.parse(body).users;
        if(!error && response.statusCode == 200){
          for (var i = 0; i < characters.length; i++) {
             var character = characters[i];
            for (var j = 0; j < users.length; j++) {
              var user = users[j];
              if(character.user_id == user.id) {
                  character.user_id = user.name;                   
              }              
            }                  
          }
              res.render('characters', 
                { 
                  characters: characters
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

/* GET One Character Infos. */
router.get('/:id', function(req, res, next) {
  var id = (req.params.id);
  request('http://localhost:3000/characters/' + id, function(error, response, body){
    var character = JSON.parse(body).character;
    if(!error && response.statusCode == 200){
      request('http://localhost:3000/users', function(error, response, body){
        var users = JSON.parse(body).users;
        if(!error && response.statusCode == 200){
            for (var j = 0; j < users.length; j++) {
              var user = users[j];
              if(character.user_id == user.id) {
                          character.user_id = user.name;
               }              
            }                  
          
              res.render('OneCharacterInfo', 
                { 
                  character: character
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
