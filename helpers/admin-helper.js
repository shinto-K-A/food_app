const { ObjectId } = require("mongodb")
const collection = require("../config/collection")
var db = require('../config/connection')
const bcrypt = require('bcrypt')
const { response } = require('express')
const { promise } = require("bcrypt/promises")

module.exports={
      doLogin:(details)=>{
            return new Promise(async(resolve,reject)=>{
                  let admin=await db.get().collection(collection.USER_COLLECTION).findOne({email:details.email,admin:true})
                  console.log(admin,'adminnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
                  if(admin){
                        bcrypt.compare(details.password, admin.password).then((status) => {
                              if (status) {
                                  console.log(status,'admin login success')
                                  response.admin = admin
                                  response.status = true
                                  resolve(response)
                              } else {
                                  console.log('admin login failed')
                                  resolve({ status: false })
                              }
                          })
                  }
                  else{
                        resolve({status:false,msg:'no such admin'})
                  }
            })

      },
      getUsers:()=>{
            return new Promise(async(resolve,reject)=>{
                 await db.get().collection(collection.USER_COLLECTION).find().toArray().then((users)=>{
                  console.log(users,'userssssssssssssssssssssssssssuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
                  resolve(users)

                 })
                 
                       
                  
            })

      },
      doAddadmin:(userId)=>{
            return new Promise(async(resolve,reject)=>{
                  console.log(userId,'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                  let user=await db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userId)},{$set:{admin:true}})
                  console.log(user,'qqqqqqqqqqqqqqqqqpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
                  resolve()
            })
      },
      doRemove:(userId)=>{
            return new Promise(async(resolve,reject)=>{
                  console.log(userId,'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                  let user=await db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectId(userId)},{$set:{admin:false}})
                  console.log(user,'qqqqqqqqqqqqqqqqqpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
                  resolve()
            })
      },
      getProducts:()=>{
            return new Promise((resolve,reject)=>{
                  db.get().collection(collection.FOOD_COLLECTION).find().toArray().then((response)=>{
                        resolve(response)
                  })
            })
      }
      ,
      addProduct:(details)=>{
            return new Promise(async(resolve,reject)=>{
                 await db.get().collection(collection.FOOD_COLLECTION).insertOne(details)
                 resolve()

            })
            

      },
      getCategory:()=>{
            return new Promise(async(resolve,reject)=>{
                  await db.get().collection(collection.FOOD_COLLECTION).distinct('category').then((response)=>{
                        resolve(response)
                  })
            })

      },
      
}