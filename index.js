require('./db/connection')
const model_cons = require('./schema/schema')

const bc = require('bcrypt')

const E = require('express')
const app = E();
const bp = require('body-parser')
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json())




const path = require('path')
const ejs = require('ejs')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


const exactpath=path.join(__dirname,'views')




app.get('/', (req, res) => {
   res.render('home')
})
app.get('/signup', (req, res) => {
   res.render('signup')
})
app.get('/signin', (req, res) => {
   res.render('signin')
})
app.get('/forget', (req, res) => {
   res.render('forget')
})




app.post('/forget', async (req, res) => {
   const emailexist = await model_cons.findOne({ email: req.body.email })
   if (!emailexist) {
      return res.send("user not exist")
   }
   else {
      emailexist.password = req.body.newpassword
      emailexist.save()
   }
})

//Register Route
app.post('/signup', async (req, res) => {

   const emailexist = await model_cons.findOne({ email: req.body.email })
   if (emailexist) {
      return res.send("email id is exist ,kindly register with different email id")
   }
   // else if(req.body.password != req.body.cpassword )
   //    {
   //       return res.send("password not matching with conifrm password")
   //    }
   else {


      const name = req.body.name
      const email = req.body.email
      const job = req.body.job
      const password = req.body.password
      const cpassword = req.body.cpassword

      // const hashedpassword = await bc.hash(password, 10)

      const template = model_cons({
         name,
         email,
         job,
         password,
         cpassword
      })
      template.save()
      return res.send("registration sucess")
   }
})

//Login Route
app.post('/signin', async (req, res) => {
   const emailexist = await model_cons.findOne({ email: req.body.email })
   if (!emailexist) {
      return res.send("user not exist ,kindly register first")
   }
   else if (req.body.password != emailexist.password) {
      return res.send("password incorrect")
   }
   else {
      return res.send("signed in ")
   }
})

const Port =process.env.PORT || 3000;
app.listen(3000, () => {
   console.log("my server is running on 3000 port")
})




