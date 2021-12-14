const express = require('express');
const path = require('path');
const ejs = require('ejs');
const router= express.Router;
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const reqOptions = { 'mode': 'cors', headers: { 'Access-Control-Allow-Origin': '*' } };
const NewsAPI = require('newsapi');
dotenv.config({ path: "./config.env" });
const newsapi = new NewsAPI(process.env.YOUR_API_KEY);
const { json } = require('express/lib/response');
const newsAPIRoutes = require('./routes/api/newsAPIRoutes');

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

app.use(newsAPIRoutes);

// Setup server ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));