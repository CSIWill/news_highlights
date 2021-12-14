const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
dotenv.config({ path: '../../config.env' });
const reqOptions = { 'mode': 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
const newsapi = new NewsAPI(process.env.YOUR_API_KEY);
const { json } = require('express/lib/response');

// initialize newsArticlesList

newsapi.v2.topHeadlines({
  language: 'en',
}).then(async (data) => {
  let newsArticlesList = await data;
  router.get('/search', (req, res) => {
    let reqSearch = `Recent News`;
    newsapi.v2.topHeadlines({
      language: 'en',
    }).then(async (data) => {
      newsArticlesList =  await data;
    });
    res.render('./html/search', {
      urSearch: reqSearch,
      newsArticles: newsArticlesList.articles,
    });
  });

  router.get('/news/ap', async (req, res) => {
    await newsapi.v2.topHeadlines({
      sources: 'associated-press',
      language: 'en',
    }).then(async (data) => {
      newsArticlesList = data;
    });
    res.render('./html/ap', {
      newsArticles: newsArticlesList.articles,
    });
  });
  
  router.get('/news/bbc', async (req, res) => {
    await newsapi.v2.topHeadlines({
      sources: 'bbc-news',
      language: 'en',
    }).then(async (data) => {
      newsArticlesList =  await data;
    });
    res.render('./html/bbc', {
      newsArticles: newsArticlesList.articles,
    });
  });
  
  router.get('/news/cnn', async (req, res) => {
    await newsapi.v2.topHeadlines({
      sources: 'cnn',
      language: 'en',
    }).then(async (data) => {
      newsArticlesList = await data;
    });
    res.render('./html/cnn', {
      newsArticles: newsArticlesList.articles,
    });
  });
  
  router.post('/search/', async (req, res) => {
    let reqSearch = req.body.userSearch || `Recent News`;
    await newsapi.v2.everything({
      q: reqSearch,
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      newsArticlesList = await data;
    });
    res.render('./html/search', {
      urSearch: reqSearch,
      newsArticles: newsArticlesList.articles,
    });
  });
});

module.exports = router;
