const mongoose = require('mongoose')
const conString = process.env.DATABASE

mongoose.connect(conString).then((res)=>{
    console.log('mongoDb connnected Success')
}).catch((err)=>{
    console.log('mongoDb connection Faild due to')
    console.log(err)
})