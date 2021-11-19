//import ecpress from 'express';
const express = require('express');
//import mongoose from 'mongoose';
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(

    {
        firstName:{
            type:String,required:true
        },
        lastName:{
            type:String,required:true
        },
        email:{
            type:String,required:true,unique:true
        },
        isAdmin:{
            type:Boolean,default:false

        },
        phoneNumber:{
            type:Number,required:true
        },
        password:{
            type:String,required:true
        }
    },
    {timestamps:true}
);


module.exports = mongoose.model('Tuser',UserSchema);
