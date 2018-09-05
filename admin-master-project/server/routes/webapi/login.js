var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/sysuser/login', function(req, res, next) {
        res.send('get/sysuser/login');
        console.log(req);
    })
    .post('/sysuser/login', function(req, res, next) {
        res.set('Content-Type','application/json')
        console.log(req.body);
        if (req.body.username=="zhangbo" && req.body.password==123) {
            res.send({success:true,mess:"登陆成功!"})
        } else {
            res.send({success:false,mess:"登陆失败!"})
        }
    });

module.exports = router;
