const express = require('express');
const path = require("path");
const ejs = require('ejs');
const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
const YOUR_API_KEY = 'ebb6d4fb6dc5441cb4969abe0c250886';
const { json } = require('express/lib/response');
const newsapi = new NewsAPI(YOUR_API_KEY);
const API_KEY = `apiKey=ebb6d4fb6dc5441cb4969abe0c250886`;

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
  let initSearch = "Hello, World";
  res.render('./html/search.ejs', {
    urSearch: initSearch
  });
});

app.get('/ap', (req, res) => {
  res.render('./html/ap.ejs', {
    api: API_KEY,
  });
});

app.get('/bbc', (req, res) => {
  res.render('./html/bbc.ejs');
});

app.get('/cnn', (req, res) => {
  res.render('./html/cnn.ejs');
});

app.post('/search/', (req, res) => {
  let reqSearch = req.body.userSearch

  res.render('./html/search', {
    urSearch: reqSearch,
  });
});

// Setup server ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// let newsArticles;
// const url = `https://newsapi.org/v2/everything?` +
//   `q=Technology&` +
//   `sources=associated-press&` +
//   `apiKey=${YOUR_API_KEY}`;
// const req = new Request(url);
// let data;
// fetch(req).then((res) => {
//   return res.json();
// }).then((data) => {
//   newsArticles = data;
// });

// newsapi.v2.everything({
//   q: 'bitcoin',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {
//   console.log(response);
//   /*
//     {
//       status: "ok",
//       articles: [...]
//     }
//   */
// });