//importing .env file
require('dotenv').config()

const express = require('express')
const app = express()
const Customer = require('./server/model/Customer')
const connectDB = require('./server/db')
connectDB()
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.set('view engine', 'ejs')
const port = 5000 || process.env.PORT

// app.get('/customer', (req, res) =>{
//     // res.send("Hello everyone")
//     res.render('index', { customer: new Customer()})
// });
app.get('/', async(req, res) => {
    const newCustomer = new Customer({
        firstName: "Gift",
        lastName: "Happy",
        details: "Just so happy like lastname",
        email: "gifthappy@gmail.com",
        tel: "7865543"
    })  
    try {
        const customers = await Customer.find({}).limit(5).sort({$natural:-1})
        // console.log(customers)
        res.render('index', {customers})
        // res.json(customers)
       
    } catch (error) {
        console.log(error)
    }

})
app.post('/create',  async (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        details: req.body.details,
        email: req.body.email,
        tel: req.body.tel,
    })
    try{
        await Customer.create(newCustomer);
        res.redirect('/');

    }catch(error){
        console.log(error);
    }  
})


app.listen(port, () =>{
    console.log(`My port is running on ${port}`)
});