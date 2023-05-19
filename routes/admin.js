const {loginAdmin,postLogin,addasAdmin,removeAdmin,viewUsers,viewProducts,getAddproducts,postAddproduct}=require('../controllers/admin')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', loginAdmin);
router.post('/login',postLogin)
router.get('/add-user',addasAdmin)
router.get('/remove-user',removeAdmin)
router.get('/view-users',viewUsers)
router.get('/view-product',viewProducts)
router.route('/add-product')
            .get(getAddproducts)
            .post(postAddproduct)
     

module.exports = router;
