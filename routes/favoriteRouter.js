const express = require('express');
const cors = require('./cors');
const authenticate = require("../authenticate");
const Favorite = require('../models/favorite');
const { replaceOne } = require('../models/favorite');

const  favoriteRouter = express.Router();

//route 1
favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    favorite.find()
    .populate("comments.author")
    .then((favorites) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(favorites);
    })
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id})
    .then(favorite=>{
        if (favorite){
            
        }else{
            Favorite.create({user:req.user._id, campsites: req.body})
            .then(favorite=>{
                res.json(favorite)
            })
        }
    })

})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

});

//route 2
favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Favorite.findById(req.params.favoriteId)
    .populate("comments.author")
    .then((favorite) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(favorite);
    })
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    
})   
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

});


//ahhhhhhhhhhhhhhh
module.exports = favoriteRouter;