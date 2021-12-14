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
  let techNewsArticlesList = await data;
  let businessNewsArticlesList = await data;
  // search page
  router.get('/search', async (req, res) => {
    let reqSearch = `Recent News`;
    await newsapi.v2.topHeadlines({
      language: 'en',
    }).then(async (data) => {
      newsArticlesList = await data;
    });
    res.render('./html/search', {
      urSearch: reqSearch,
      newsArticles: newsArticlesList.articles,
    });
  });
  // Associated Press Page
  router.get('/news/ap', async (req, res) => {
    await newsapi.v2.topHeadlines({
      sources: 'associated-press',
      language: 'en',
    }).then(async (data) => {
      newsArticlesList = data;
    });
    await newsapi.v2.everything({
      q: 'Technology',
      sources: 'associated-press',
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      techNewsArticlesList = await data;
    });
    await newsapi.v2.everything({
      q: 'Business',
      sources: 'associated-press',
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      businessNewsArticlesList = await data;
    });
    res.render('./html/ap', {
      newsArticles: newsArticlesList.articles,
      techNewsArticles: techNewsArticlesList.articles,
      businessNewsArticles: businessNewsArticlesList.articles,
    });
  });
  // BBC News Page  
  router.get('/news/bbc', async (req, res) => {
    await newsapi.v2.topHeadlines({
      sources: 'bbc-news',
      language: 'en',
    }).then(async (data) => {
      newsArticlesList = await data;
    });
    await newsapi.v2.everything({
      q: 'Technology',
      sources: 'bbc-news',
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      techNewsArticlesList = await data;
    });
    await newsapi.v2.everything({
      q: 'Business',
      sources: 'bbc-news',
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      businessNewsArticlesList = await data;
    });
    res.render('./html/bbc', {
      newsArticles: newsArticlesList.articles,
      techNewsArticles: techNewsArticlesList.articles,
      businessNewsArticles: businessNewsArticlesList.articles,
    });
  });
  // CNN News Page  
  router.get('/news/cnn', async (req, res) => {
    await newsapi.v2.topHeadlines({
      sources: 'cnn',
      language: 'en',
    }).then(async (data) => {
      newsArticlesList = await data;
    });
    await newsapi.v2.everything({
      q: 'Technology',
      sources: 'cnn',
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      techNewsArticlesList = await data;
    });
    await newsapi.v2.everything({
      q: 'Business',
      sources: 'cnn',
      language: 'en',
      sortBy: 'relevancy',
    }).then(async (data) => {
      businessNewsArticlesList = await data;
    });
    res.render('./html/cnn', {
      newsArticles: newsArticlesList.articles,
      techNewsArticles: techNewsArticlesList.articles,
      businessNewsArticles: businessNewsArticlesList.articles,
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
