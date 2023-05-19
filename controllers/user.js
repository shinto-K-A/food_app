const adminHelper = require('../helpers/admin-helper')
let userHelpers=require('../helpers/user-helper')
module.exports={
      loginUser:(req,res)=>{
           
            res.render('user/login',{msg:req.session.error,layout:null})
            req.session.error=null
      },
      loginPost:(req,res)=>{
            userHelpers.doLogin(req.body).then((response)=>{
                  if (response.status) {
                        console.log(response.user,'rrrrrrrrrrrrr');
                        req.session.user=response.user
                       
                        adminHelper.getCategory().then((response)=>{
                              res.render('user/home',{user: req.session.user,layout:null,response})
                        
                        })
                        
                        
                  }
                  else{
                        
                        req.session.error=response.errmsg
                        
                        res.redirect("/")
                  }
            })
      },
      userSignup:(req,res)=>{
            userHelpers.doSignup(req.body).then((response)=>{
                  if(response.status){
                        res.end("SUCCESSS")

                  }
            })
            
      },
      signupGet:(req,res)=>{
            res.render('user/signup',{layout:null})
      },
      editGet:(req,res)=>{
            userHelpers.edit(req.query.id).then((response)=>{
                  let user=response
                  res.render('user/edit',{user,layout:null})

            })
           

      },
      editPost:(req,res)=>{
            
            userHelpers.doEdit(req.body,req.session.user).then((response)=>{
                 
                  res.redirect("/")
            })

      },
      getSingle:(req,res)=>{
            console.log(req.query.category,'11111112222222222222222222222222222222222222222');
            userHelpers.productGet(req.query.category).then((response)=>{
                  console.log(response,'66666666666666666666666666');
                  res.render('user/single',{layout:null,response})
            })

      }
      
}