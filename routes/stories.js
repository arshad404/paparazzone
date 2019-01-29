const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');
const path = require('path');

router.get('/', (req, res) => {
    res.render('stories/index');
});

router.get("/add",ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

router.post("/", (req, res) =>{
    let allowComments;

    if(req.body.allowComments){
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    //create Story
    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`);
            console.log(story.id);
        });
});

module.exports = router;