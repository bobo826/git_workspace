var express = require('express');
var router = express.Router();
// 该路由使用的中间件
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'admin-master-client' });
});

module.exports = router;
