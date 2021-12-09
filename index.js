const express = require('express');
const ejs = require('ejs');
require("dotenv").config();

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

app.get('/ap', (req,res) => {
  res.render('./html/ap.ejs');
});

app.get('/bbc', (req,res) => {
  res.render('./html/bbc.ejs');
});

app.get('/cnn', (req,res) => {
  res.render('./html/cnn.ejs');
});

// Setup server ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR_API_KEY');

