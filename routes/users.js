var express = require('express');
var router = express.Router();

/* GET all Users. */
router.get('/users', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({},{},function(err, result){
    res.json(result);
  });
});

/* GET Users by Company ID. */
router.get('/user/:company', function(req, res) {
  var db = req.db;
  var companyToFind = req.params.company;
  var collection = db.get('userlist');
  collection.find({"company": companyToFind}, {}, function (err, result) {
      res.send(result);
  });
});

/*POST to create user*/
router.post('/user', function(req,res){
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err){
    res.send(
        (err === null) ? { msg: 'Successfully added user.' } : { msg: err }
    );
  });
});

/*Update user by ID*/
router.put('/user/:id', function(req, res){
  var db = req.db;
  var collection = db.get('userlist');
  var id = req.params.id;
  var user = req.body;
  collection.update({'_id': id}, user, {safe:true}, function(err){
    res.send(
        (err === null) ? { msg: "User successfully updated." } : { msg: err }
    );
  });
});

/*Delete User by ID*/
router.delete('/user/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: 'Successfully deleted user.' } : { msg:'error: ' + err });
  });
});

module.exports = router;
