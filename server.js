const axios = require("axios")
const cheerio = require("cheerio")
// const crawler = require("cheerio-crawler")
const express = require('express')
const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node')


// 
const app = express()

// keywords for writer/author/sports editor/ editorial/ 
// package that uses email addresses to get the email owner's name. 

// Cors error bypass
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  })



app.get('/url?*', function (req, res) {

  // console.log(req.query)
  const { url, fileUrl } = req.query;

  // let allUrls = [];
  let allRows = [];

  // File path.
  // .xlsx
const objects = []
const schema = [
  {
    column: 'Domain',
    type: String,
    value: row => row.domain
  },
  {
    column: 'URL',
    type: String,
    value: row => row.url
  },
  {
    column: 'Page As',
    type: Number,
    value: row => row.pageAs
  },
  {
    column: 'Ref.Domain',
    type: Number,
    value: row => row.refDomain
  },
  {
    column: 'Backlinks',
    type: Number,
    value: row => row.backlinks
  },
  {
    column: 'Search Traffic',
    type: Number,
    value: row => row.searchTraffic
  },
  {
    column: 'URL Keywords',
    type: Number,
    value: row => row.urlKeywords
  },
  {
    column: 'Name',
    type: String,
    value: row => row.name
  },
  {
    column: 'Email',
    type: String,
    value: row => row.email
  },
  {
    column: 'Email Verified',
    type: Boolean,
    value: row => row.emailVerified 
  } 
]
  // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
  async function writeToExcelFile(arr) {
    arr.splice(0, 1)
    arr.map((row) => {


      objects.push({
        domain: row[0],
        url: row[1],
        pageAs: row[2] === null ? 0 : row[2],
        refDomain: row[3] === null ? 0 : row[3],
        backlinks:  row[4] === null ? 0 : row[4],
        searchTraffic:  row[5] === null ? 0 : row[5],
        urlKeywords:  row[6] === null ? 0 : row[6],
        name: row[7],
        email: row[8],
        emailVerified: row[9]
      })

    })
    // console.log(objects[0])
    // console.log(allRows[0])

      await writeXlsxFile(objects, {
        schema,
        filePath: './link.xlsx'
      })
  }

  readXlsxFile("./AllKeyword.xlsx", {sheet: 1}).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    // rows.map((row) => {
    //   allUrls.push(row[0])
    //   // allRows.push(row)
    //   // console.log(row)
    // })
    allRows = rows;
    console.log(allRows.length)
    allRows.map((rowCheck, idxCheck) => {        
      let rep = 0;

      allRows.map((rowAgainst, idxAgainst) => {

        if(rowCheck[0] === rowAgainst[0]){
          if(rep >= 1){
            allRows.splice(idxAgainst, 1)
          }
          rep = rep + 1;
        }

      })
    })
    console.log(allRows.length)
    console.log(allRows[allRows.length - 1])
    writeToExcelFile(allRows)
  })


  // readXlsxFile("./LinkSwapsSimilarSites.xlsx", {sheet: 3}).then((rows) => {
  //   // `rows` is an array of rows
  //   // each row being an array of cells.
  //   rows.map((row) => {
  //     // console.log(row[1])
  //     allUrls.push(row[1])
  //   })
  //   console.log(allUrls.length)
  //   console.log(allUrls[allUrls.length - 1])
  //   allUrls.shift()
  //   // getDom(allUrls)

  // })
  const crawledData = [];

  const crawlDom = (response) => {
    // link[0].property, link[1].property
    let url;
    if(response.value.config.url === undefined){
      url = 'bad url'
    }else{
      url = response.value.config.url;
    }

      let dom = response.value.data;
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
              crawledData.push({[url]: href})
            }
            if(href.search(/mailto/i) > -1){
              crawledData.push({[url]: href})
            }
            if(href.search(/author/i) > -1){
              crawledData.push({[url]: href})
            }
            if(href.search(/writer/i) > -1){
              crawledData.push({[url]: href})
            }
            if(href.search(/editor/i) > -1){
              crawledData.push({[url]: href})
            }
            if(href.search(/writing/i) > -1){
              crawledData.push({[url]: href})
            }
            if(href.search(/about/i) > -1){
              // crawledData.push({[url]: href})
            }
            if(href.search(/about-us/i) > -1){
              // crawledData.push({[url]: href})
            }
            if(href.search(/contact-us/i) > -1){
              crawledData.push({[url]: href})
            }
      }
    })
    // promise.value.config.url
    console.log(crawledData)
    
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
        // console.log(url)
      })
    }
    const links = urls.map((url) => {
      return sendCrawlRequest(url)
    })

    Promise.allSettled(links).then((results) => {
      const fulfilledResponses = results.filter(result => result.status === 'fulfilled');
      const rejectedResponses = results.filter(result => result.status === 'rejected');

      fulfilledResponses.map((promise, index) => {
        crawlDom(promise, index)
      })
    })

  }
  
  res.send({"Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file."})

})

app.get('/urls?*', function (req, res) {
  console.log(req.query)
})

    
app.listen(5001)