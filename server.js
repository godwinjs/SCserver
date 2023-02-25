const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  });

app.get('/url', function (req, res) {
    console.log(req.query)
  res.send({'Hello World': 'world'});
})


// // initialized with the first webpage to visit
// const paginationURLsToVisit = ["https://www.site.com/"];

// async function main(maxPages = 50) {

//     const visitedURLs = [];

//     const productURLs = new Set();

//     // iterating until the queue is empty
//     // or the iteration limit is hit
//     while (
//         paginationURLsToVisit.length !== 0 &&
//         visitedURLs.length <= maxPages
//         ) {
//         // the current webpage to crawl
//         const paginationURL = paginationURLsToVisit.pop();

//         // retrieving the HTML content from paginationURL
//         const pageHTML = await axios.get(paginationURL);

//         // adding the current webpage to the
//         // web pages already crawled
//         visitedURLs.push(paginationURL);

//         // initializing cheerio on the current webpage
//         const $ = cheerio.load(pageHTML.data);

//         // retrieving the pagination URLs
//         $(".page-numbers a").each((index, element) => {
//             const paginationURL = $(element).attr("href");

//             // adding the pagination URL to the queue
//             // of web pages to crawl, if it wasn't yet crawled
//             if (
//                 !visitedURLs.includes(paginationURL) &&
//                 !paginationURLsToVisit.includes(paginationURL)
//             ) {
//                 paginationURLsToVisit.push(paginationURL);
//             }
//         });

//         // retrieving the product URLs
//         $("li.product a.woocommerce-LoopProduct-link").each((index, element) => {
//             const productURL = $(element).attr("href");
//             productURLs.add(productURL);
//         });
//     }

//     // logging the crawling results
//     console.log([...productURLs]);

//     // use productURLs for scraping purposes...
// }

// main()
//     .then(() => {
//         process.exit(0);
//     })
//     .catch((e) => {
//         // logging the error message
//         console.error(e);

//         process.exit(1);
//     });

    
app.listen(5000)