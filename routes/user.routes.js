const express = require("express")
const userModle = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const router = express.Router()
const { body, validationResult } = require('express-validator');

router.get("/register", (req, res) => {
    res.render("register")
})
router.post("/register",
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
    async (req, res) => {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array(),
                message: 'Invalid data'
            })
        }


        const { username, email, password } = req.body
        
        console.log(">" + password + "<");

        const hashPassword = await bcrypt.hash(password, 10)
        // console.log(hashPassword);

        const newUser = await userModle.create({
            email,
            username,
            password:hashPassword
        })
        // console.log("Hashing password:", password, "->", hashPassword)

        res.json(newUser)
    })

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login",
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array(),
                message: 'Invalid data'
            })
        }

        const { username, password } = req.body

        const user = await userModle.findOne({
            username: username
        })

        if (!user) {
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }

        console.log(user.password)
        console.log(password)
        console.log(">" + password + "<");

        const isMatch = await bcrypt.compare(password, user.password)

        console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({
                message: "username or password is incorrect"
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET)

        res.cookie('token', token)

        res.send("Logged In")
    }
)


module.exports = router
