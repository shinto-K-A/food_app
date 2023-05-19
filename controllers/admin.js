const { response } = require('../app');
const adminHelper = require('../helpers/admin-helper')
module.exports = {
      loginAdmin: (req, res) => {
            res.render('admin/login', { layout: null })
      },
      postLogin: (req, res) => {
            console.log(req.body, 'ttttt');
            let Data = req.body
            console.log(Data, 'tyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyygggggggggg');

            const email = "shinto@gmail.com";
            const password = 123;

            if (Data.email == email & Data.password == password) {
                  adminHelper.getUsers().then((response) => {

                        let user = response

                        res.render('admin/landing', { user })

                  })

            }
            else {
                  adminHelper.doLogin(req.body).then((response) => {
                        if (response.status) {
                              adminHelper.getUsers().then((response) => {

                                    let user = response
                                    console.log(response, 'from userrrrrrrrrrrrrrr');
                                    res.render('admin/landing', { user })
                              })

                        }
                        else {
                              res.redirect('/admin/login')
                        }
                  })

            }
      },
      addasAdmin: (req, res) => {
            let userId=req.query.id
            console.log(userId,'userIIIIIIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSSSSS');
            adminHelper.doAddadmin(userId).then((response)=>{

                  adminHelper.getUsers().then((response) => {

                        let user = response

                        res.render('admin/landing', { user })})
            })

      },
      removeAdmin: (req, res) => {
            let userId=req.query.id
            
            adminHelper.doRemove(userId).then((response)=>{

                  adminHelper.getUsers().then((response) => {

                        let user = response

                        res.render('admin/landing', { user })})
            })

      },
      viewUsers:(req,res)=>{
            adminHelper.getUsers().then((response) => {

                  let user = response

                  res.render('admin/landing', { user })})

      },
      viewProducts:(req,res)=>{
            adminHelper.getProducts().then((response)=>{
                  let product=response
                  res.render('admin/view-products',{product})
            })
      },
      getAddproducts:(req,res)=>{
            
            adminHelper.getCategory().then((response)=>{
                  console.log(response,'hhhhhhhhhhhhhhhaaaaaaaaaaaaaaaaaaaiiiiiiiiiiiiiiiiii');
                  res.render('admin/add-product',{response})

            })
            
            
      },
      postAddproduct:(req,res)=>{
            console.log(req.body,'iiiiiioooooooooooo');
            adminHelper.addProduct(req.body).then(()=>{
                  console.log('theeeeeeeeeeeennnnnnnnn');
                  res.redirect('/admin/view-product')
            })
      }
}