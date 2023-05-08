const axios = require("axios")
const cheerio = require("cheerio")
const express = require('express')
const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node')


// 
const app = express()

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

//   readXlsxFile("./AllKeyword.xlsx", {sheet: 1}).then((rows) => {
//     // `rows` is an array of excel file rows

//     allRows = rows;
//     let count = 0;
//     console.log(allRows.length)
//     allRows.map((rowCheck, idxCheck) => {   
       
//       let rep = 0;

//       allRows.map((rowAgainst, idxAgainst) => {
//         count = count + 1;   
//         if(rowCheck[0] === rowAgainst[0]){
//           if(rep >= 1){
//             allRows.splice(idxAgainst, 1)
//           }
//           rep = rep + 1;
//         }
//         if(allRows.length - 1 == idxCheck){
//           console.log(count)
//         }
//       })

//     })
//     console.log(allRows.length)
//     console.log(allRows[allRows.length - 1])
//     // writeToExcelFile(allRows)
//   })

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

    // 
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

    //   Return Dom response data from url
  const getDom = (urls) => {
    const sendCrawlRequest = (url) => {
      return axios.get(url).then((data) => {
        return data.data;
      }).catch(error => {
        console.error('Error:', error.message)
        // console.error('Stack trace:', error.stack)
  
        // Retry the request
        console.log(`Retrying request to ${url}...`)
        // return axios.get(url)
      })
    }

    const links = urls.map((url) => {
      return sendCrawlRequest(url)
    })

    Promise.allSettled(links).then((results) => {
      const fulfilledResponses = results.filter(result => result.status === 'fulfilled');
      const rejectedResponses = results.filter(result => result.status === 'rejected');

      console.log(fulfilledResponses)
      fulfilledResponses.map((promise, index) => {
        // crawlDom(promise, index)
      })
    })

  }

  getDom(['https://www.chron.com/', 'https://www.statesman.com/'])
  
  res.send({"Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file."})

})

app.get('/urls?*', function (req, res) {
  console.log(req.query)
})

    
app.listen(5001)