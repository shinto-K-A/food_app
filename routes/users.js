const {loginUser,userSignup,signupGet,loginPost,editGet,editPost,getSingle} =require('../controllers/user')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',loginUser);
router.post('/login',loginPost)
router.get('/signup',signupGet)
router.post('/signup',userSignup)
router.route('/edit')
      .get(editGet)
      .post(editPost)

router.get('/single',getSingle)

module.exports = router;
