const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
dotenv.config({ path: "./config.env" });
// const newsapi = new NewsAPI(process.env.YOUR_API_KEY);
const newsapi = new NewsAPI(YOUR_API_KEY);
// const newsapi = new NewsAPI('e5b6885d442e4232a387c52ea87f6f45');
// const YOUR_API_KEY = 'e5b6885d442e4232a387c52ea87f6f45';

// const YOUR_API_KEY = 'ebb6d4fb6dc5441cb4969abe0c250886';
const { json } = require('express/lib/response');


// Create express app
const app = express();


// Initialize Body Parser Middleware to parse data sent by users in the request object
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse HTML form data

// Initialize ejs Middleware
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

// routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get('/login', (req, res) => {
  res.render('./html/login.ejs');
});

app.get('/settings', (req, res) => {
  res.render('./html/settings.ejs');
});
let newsArticlesList;
app.get('/search', (req, res) => {
  let reqSearch = `Recent News`;
  newsapi.v2.topHeadlines({
    language: 'en',
  }).then(response => {
    newsArticlesList = response;
  });
  res.render('./html/search', {
    urSearch: reqSearch,
    newsArticles: newsArticlesList.articles,
  });
});

app.get('/ap', (req, res) => {
  newsapi.v2.topHeadlines({
    sources: 'associated-press',
    language: 'en',
  }).then(response => {
    newsArticlesList = response;
  });
  res.render('./html/ap.ejs', {
    newsArticles: newsArticlesList.articles,
  });
});

app.get('/bbc', (req, res) => {
  newsapi.v2.topHeadlines({
    sources: 'bbc-news',
    language: 'en',
  }).then(response => {
    newsArticlesList = response;
  });
  res.render('./html/bbc.ejs', {
    newsArticles: newsArticlesList.articles,
  });
});

app.get('/cnn', (req, res) => {
  newsapi.v2.topHeadlines({
    sources: 'cnn',
    language: 'en',
  }).then(response => {
    newsArticlesList = response;
  });
  res.render('./html/cnn.ejs', {
    newsArticles: newsArticlesList.articles,
  });
});

app.post('/search/', (req, res) => {
  let reqSearch = req.body.userSearch
  newsapi.v2.everything({
    q: reqSearch,
    language: 'en',
    sortBy: 'relevancy',
  }).then(response => {
    newsArticlesList = response;
  });
 
  res.render('./html/search', {
    urSearch: reqSearch,
    newsArticles: newsArticlesList.articles,
  });
});

// Setup server ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));