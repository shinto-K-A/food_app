const { response } = require('express');
var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
module.exports = {
      doSignup: (userData) => {
            return new Promise(async (resolve, reject) => {
                  userData.password = await bcrypt.hash(userData.password, 10)
                  userData.admin = false
                  db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response) => {
                        resolve({ status: true })
                  })

            })

      },
      doLogin: (userData) => {
            return new Promise(async (resolve, reject) => {
                  let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
                  if (user) {
                        if (user.admin) {
                              resolve({ status: false, errmsg: "You cant log in as admin" })

                        }
                        else {
                              bcrypt.compare(userData.password, user.password).then((status) => {
                                    if (status) {
                                          console.log('login success')
                                          response.user = user
                                          response.status = true
                                          resolve(response)
                                    } else {
                                          console.log('failed')
                                          resolve({ status: false, errmsg: "incorrect password" })
                                    }
                              })
                        }

                  }
                  else {
                        resolve({ status: false, errmsg: "No such user" })

                  }

            })

      },
      edit: (userId) => {
            return new Promise(async (resolve, reject) => {
                  let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) })
                  resolve(user)

            })

      },
      doEdit: (details, user) => {
            return new Promise(async (resolve, reject) => {
                  if (!details.firstName) {
                        details.firstName = user.firstName
                  }
                  if (!details.email) {
                        details.email = user.email
                  }
                  if (!details.phoneNumber) {
                        details.phoneNumber = user.phoneNumber
                  }

                  await db.get().collection(collection.USER_COLLECTION).updateOne({ email: user.email }, { $set: { firstName: details.firstName, email: details.email, phoneNumber: details.phoneNumber } })
                  resolve()

            })

      },
      productGet:(details)=>{
            return new Promise(async(resolve,reject)=>{
                  await db.get().collection(collection.FOOD_COLLECTION).find({category:details}).toArray().then((response)=>{
                        resolve(response)
                  })
            })

      }
}