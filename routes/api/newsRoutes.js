const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
const { json } = require('express/lib/response');
const newsapi = new NewsAPI('ebb6d4fb6dc5441cb4969abe0c250886');

router.post('',(req,res)=> {
    // asdf
})
module.exports = router