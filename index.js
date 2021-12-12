const express = require('express');
const path = require('path');
const ejs = require('ejs');
const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
const YOUR_API_KEY = 'e5b6885d442e4232a387c52ea87f6f45';
const fetch = require('node-fetch');

// const YOUR_API_KEY = 'ebb6d4fb6dc5441cb4969abe0c250886';
const { json } = require('express/lib/response');
const newsapi = new NewsAPI(YOUR_API_KEY);
// const API_KEY = `apiKey=ebb6d4fb6dc5441cb4969abe0c250886`;
const API_KEY = `apiKey=e5b6885d442e4232a387c52ea87f6f45`;
const bodyParser = require('body-parser');

// Create express app
const app = express();
dotenv.config({ path: "./config.env" });

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

app.get('/search', (req, res) => {
  let initSearch = "";
  let newsArticlesList =  {};
  res.render('./html/search.ejs', {
    urSearch: initSearch,
    newsArticles: newsArticlesList,
  });
});

app.get('/ap', (req, res) => {
  res.render('./html/ap.ejs', {
    api: YOUR_API_KEY,
  });
});

app.get('/bbc', (req, res) => {
  res.render('./html/bbc.ejs', {
    api: YOUR_API_KEY,
  });
});

app.get('/cnn', (req, res) => {
  res.render('./html/cnn.ejs', {
    api: YOUR_API_KEY,
  });
});
app.post('/search/', (req, res) => {
  let reqSearch = req.body.userSearch
  // newsapi.v2.everything({
  //   q: reqSearch,
  //   language: 'en',
  //   sortBy: 'relevancy',
  // }).then(response => {
  //  var newsArticlesList = response;
  // //   console.log(newsArticlesList)
  // // console.log(typeof newsArticlesList)
  // // console.log(typeof JSON.stringify(newsArticlesList))
  // });
  let newsArticlesList;
  const url = `https://newsapi.org/v2/everything?` +
    `q=${reqSearch}&` +
    `apiKey=${YOUR_API_KEY}`;
  fetch(url).then((response) => {
    return response.json();
  }).then((data) => {
    newsArticlesList = data.articles;
    console.log(newsArticlesList);
  })
  res.render('./html/search', {
    urSearch: reqSearch,
    newsArticles: newsArticlesList,
  });
});

// Setup server ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));