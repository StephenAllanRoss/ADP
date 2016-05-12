var express = require('express');
var router = express.Router();

/* GET Employer by Username and Password. */
router.get('/login/:company/:password', function(req, res) {
    var db = req.db;
    var employerName = req.params.company;
    var employerPassword = req.params.password;
    //Per requirements, to use a single shared password.
    var employerObject = (employerPassword == 'adp') ? {"company": employerName} : {"company": employerName, "password": employerPassword};
    var collection = db.get('companylist');
    collection.find(employerObject, {}, function (err, result) {
        if (result.length != 1) {
            res.status(401).send({msg: "Invalid credentials supplied. Please make sure you are using the shared password of \'adp\'"});
        } else {
            res.send(result);
        }
    });
});

/*POST to create employer*/
router.post('/company', function(req,res){
    var db = req.db;
    var collection = db.get('companylist');
    collection.find({"company": req.body.company}, {}, function (err, result) {
        if (result.length != 0) {
            res.status(409).send({msg: "Company by this name already exists."});
        } else {
            collection.insert(req.body, function(err, result){
                res.send(
                    (err === null) ? result : { msg: err }
                );
            });
        }
    });
});

module.exports = router;
