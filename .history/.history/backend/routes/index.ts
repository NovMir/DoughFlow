import express from'express';
const router = express.Router();
export default router;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//TODO
//add Login Display and Process
//add Register Display and Process
//module.exports = router;
