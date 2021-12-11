//import express from 'express';
const express = require("express");
//import tuser from '../models/tuser.js'
const Tuser = require("../models/tuser.js");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAuthentication,
} = require("./verifyToken.js");

router.get("/", (req, res) => {
  res.send("hello");
});

//it will take time to connect with database so used ASYNC
router.post("/", async (req, res) => {
  try {
    const newUser = new Tuser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      //password:CryptoJS.AES.encrypt(req.body.conformPassword, process.env.PASS_CODE),
      //conformPassword:CryptoJS.AES.encrypt(req.body.conformPassword, process.env.PASS_CODE)
      password: req.body.password,
    });
    try {
      //if (newUser.password !== req.body.conformPassword){
      //res.status(400).json("conform password not match");
      //}else{
      newUser.password = CryptoJS.AES.encrypt(
        newUser.password,
        process.env.PASS_CODE
      );
      const savedUser = await newUser.save();
      console.log(savedUser);
      res.status(201).json(savedUser); //}
    } catch (err) {
      //res.send(err)
      res.status(401).json(err);
      console.log(err.errors);
    }
  } catch (err) {
    console.log(err.errors);
    res.send(err.errors);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Tuser.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("Wrong Credentials");
    } else {
      const hashPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_CODE
      ).toString(CryptoJS.enc.Utf8);
      hashPassword !== req.body.password &&
        res.status(401).json("wrong Credentials");
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_CODE,
        { expiresIn: "1d" }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    }
  } catch (error) {
    res.status(404).json(error.errors._message);
  }
});

router.patch("/:id", verifyTokenAndAuthentication, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_CODE
    ).toString();
  }
  //findByIdAndUpdate(id,{set},{new:ture}),new will help to save the update once only is we are not using it it will save everything and sets new information.
  try {
    const updatedUser = await Tuser.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthentication, async (req, res) => {
  try {
    await Tuser.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been Deleted");
  } catch (err) {
    res.ststus(500).json(err);
  }
});

module.exports = router;
