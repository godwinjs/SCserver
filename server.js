const axios = require("axios")
const cheerio = require("cheerio")
// const crawler = require("cheerio-crawler")
const express = require('express')
const readXlsxFile = require('read-excel-file/node')


// 
const app = express()



// .xlsx


// keywords for writer/author/sports editor/ editorial/ 
// package that uses email addresses to get the email owner's name. 

// Cors error bypass
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  })



app.get('/url?*', function (req, res) {

  console.log(req.query)
  const { url, fileUrl } = req.query;

  let allUrls = [];

  // File path.
  // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
  readXlsxFile("./LinkSwapsSimilarSites.xlsx").then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    rows.map((row) => {
      // console.log(row[1])
      allUrls.push(row[1])
    })
    allUrls.shift()
    getDom(allUrls)

  })
  const crawlDom = (response) => {
    // link[0].property, link[1].property
    // console.log(urls[urls.length - 1])
    let dom = response[0].data;
    const $ = cheerio.load(dom)

    // plugins
    $.prototype.logHtml = function () {
      console.log(this.html());
    };
    $.prototype.logText = function () {
      console.log(this.text());
    };

    $('body').find('a').map((a) => {
      let href = $('body').find('a')[a].attribs.href;
      // console.log(href.search(/contact/i))
      if(!(href === undefined)){
        if(href.search(/contact/i) > -1) {
          console.log(href)
        }
        if(href.search(/mailto/i) > -1){
          console.log(href)
        }
        if(href.search(/author/i) > -1){
          console.log(href)
        }
        if(href.search(/writer/i) > -1){
          console.log(href)
        }
        if(href.search(/editor/i) > -1){
          console.log(href)
        }
        if(href.search(/writing/i) > -1){
          console.log(href)
        }
        if(href.search(/about/i) > -1){
          console.log(href)
        }
        if(href.search(/about-us/i) > -1){
          console.log(href)
        }
        if(href.search(/contact-us/i) > -1){
          console.log(href)
        }
      }
    })
  }

  const getDom = (urls) => {
    // for url array batch processing
    const sendCrawlRequest = (url) => {
      return axios.get(url).catch(error => {
        console.error('Error:', error.message)
        console.error('Stack trace:', error.stack)
  
        // Retry the request
        console.log(`Retrying request to ${url}...`)
        return axios.get(url)

      }).finally(() => {
        console.log(url)
      })
    }
    const links = urls.map((url) => {
      return sendCrawlRequest(url)
    })

    Promise.allSettled(links).then((results) => {
      const fulfilledResponses = results.filter(result => result.status === 'fulfilled');
      const rejectedResponses = results.filter(result => result.status === 'rejected');

      crawlDom(fulfilledResponses)
    })

  }

  console.log(allUrls)
  // axios.get(url).then(() => {
  //   res.text()
  // }).then((dom) => {
  //   console.log(dom)
  // })
  
  // res.send({"hello": "world"})

})

app.get('/urls?*', function (req, res) {
  console.log(req.query)
})

    
app.listen(5000)