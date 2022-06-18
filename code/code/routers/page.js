
const express = require ('express')
const loggedin = require ('../controllers/loggedin')
const router = express.Router()

router.get('/',loggedin, (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('signup')
})
router.get('/login', (req, res) => {
    res.render('signin')
})
router.get('/home', (req, res) => {
    res.render('index')
})
router.get('/accessory-jewelry', (req, res) => {
    res.render('AccessoryJewelry')
})
router.get('/accessory-watch', (req, res) => {
    res.render('AccessoryWatch')
})
router.get('/book-comic', (req, res) => {
    res.render('Comic')
})
router.get('/book-magazine', (req, res) => {
    res.render('Magazine')
})
router.get('/book-novel', (req, res) => {
    res.render('Novel')
})
router.get('/comestic-beauty', (req, res) => {
    res.render('Beauty')
})
router.get('/comestic-health', (req, res) => {
    res.render('Health')
})
router.get('/electronic-accessories', (req, res) => {
    res.render('ElectronicAccessories')
})
router.get('/electronic-camera', (req, res) => {
    res.render('Camera')
})
router.get('/fashion-men', (req, res) => {
    res.render('FashionMen')
})
router.get('/fashion-women', (req, res) => {
    res.render('FashionWomen')
})
router.get('/houseware-bedroom', (req, res) => {
    res.render('HousewareBedroom')
})
router.get('/houseware-kitchen', (req, res) => {
    res.render('HousewareKitchen')
})
router.get('/houseware-livingroom', (req, res) => {
    res.render('HousewareLivingroom')
})
router.get('/shoes-men', (req, res) => {
    res.render('ShoesMen')
})
router.get('/shoes-women', (req, res) => {
    res.render('ShoesWomen')
})
router.get('/loginshop', (req, res) => {
    res.render('signinShop')
})
router.get('/sports-basketball', (req, res) => {
    res.render('SportsBasketball')
})
router.get('/sports-golf', (req, res) => {
    res.render('SportsGolf')
})
router.get('/sports-soccer', (req, res) => {
    res.render('SportsSoccer')
})
router.get('/sports-volleyball', (req, res) => {
    res.render('SportsVolleyball')
})
router.get('/my_account', (req, res) => {
    res.render('myAccount')
})
router.get('/add_product', (req, res) => {
    res.render('addProduct')
})
router.get('/index_signin', (req, res) => {
    res.render('indexSignin')
})
router.get('/product', (req, res) => {
    res.render('indexProduct')
})
router.get('/orderproduct', (req, res) => {
    res.render('OrderProduct')
})
module.exports = router