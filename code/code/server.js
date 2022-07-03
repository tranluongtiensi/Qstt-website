const express = require('express')
const User = require ('./model/user')
const bodyParser = require('body-parser')
const cookie = require ('cookie-parser')
const page  = require ('./routers/page')
const auth = require ('./controllers/auth')
const fileUpload = require ('express-fileupload')
const app = express()
const port =3000


app.use(express.static('./public/asset'))
app.use('/js', express.static('./public/js'))
app.set('view engine', 'ejs')
app.use(cookie())
app.use(bodyParser.json())


User.connect((err) => {
    if (err) throw err
    console.log("database connected")
})

app.use('/', page )

app.post('/addproduct', (req, res) => {
    let imageProduct
    let uploadPath
    if (!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('No file were uploaded')
    }
    imageProduct = req.files.imageProduct
    uploadPath=__dirname + '/upload/' + imageProduct.name
    console.log(imageProduct)
    imageProduct.mv(uploadPath, (req, res) => {
        if(err) return res.status(500).send(err)
        connection.query('UPDATE productdata SET image = ? WHERE id ="1"', [imageProduct.name], (err, rows) => {
            if (!err) {
              res.redirect('/');
            } else {
              console.log(err);
            }
       })
    })
})
app.use('/api', auth)
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
  })