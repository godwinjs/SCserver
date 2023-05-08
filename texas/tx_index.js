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
    column: 'Email',
    type: String,
    value: row => row.email
}
]

let allDomains = [];

  // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
  async function writeToExcelFile(arr) {
    // console.log(objects[0])
    // console.log(allRows[0])

    arr.map((row) => {
        objects.push({
            domain: row[0],
            url: row[1],
            email: row[2]
          })
    })

      await writeXlsxFile(objects, {
        schema,
        filePath: './texas/sitesDone.xlsx'
      })

      console.log('done writing')
  }

  readXlsxFile("./texas/TexasNewsSites.xlsx", {sheet: 1}).then((rows) => {
    // `rows` is an array of excel file rows
    rows.shift()
    rows.map((row) => {
        allDomains.push(row[0])
    })
    //   getDom(allDomains)
  })

  const crawledData = [];
  const siteEmails =[]

  const crawlDom = (response, index) => {
    // link[0].property, link[1].property
    let url, dom= response.value.data;
    if(response.value === undefined){
      url = 'bad url'
    }else{
      url = response.value.config.url;
    }

    crawledData[index] = [];

    const $ = cheerio.load(dom)

    // plugins
    $.prototype.logHtml = function () {
        console.log(this.html());
    };
    $.prototype.logText = function () {
        console.log(this.text());
    };

    function pushHttps(str){
        if(str.split(':')[0] === 'https'){
            if(str.split('/').length < 6){
                crawledData[index].push(str)
            }
        }else{            
            if(str.split('/').length < 4){
                crawledData[index].push(url+str)
            }
        }
    }
    // 
    $('body').find('a').map((a) => {
          let href = $('body').find('a')[a].attribs.href;
          // console.log(href.search(/contact/i))
          if(!(href === undefined)){

            if(href.search(/mailto/i) > -1){
                pushHttps(href);
            }else{
                if(href.search(/contact/i) > -1) {
                    pushHttps(href);
                  }else{
                      if(href.search(/contact-us/i) > -1){
                        pushHttps(href);
                        }else{
                          if(href.search(/about/i) > -1){
                            pushHttps(href);
                            }else{
                              if(href.search(/about-us/i) > -1){
                                pushHttps(href);
                                }else{
                                  if(href.search(/author/i) > -1){
                                    pushHttps(href);
                                  }else{
                                    if(href.search(/writer/i) > -1){
                                        pushHttps(href);
                                    }else{
                                        if(href.search(/editor/i) > -1){
                                            pushHttps(href);
                                        }else{
                                            if(href.search(/writing/i) > -1){
                                                pushHttps(href);
                                            }
                                        }
                                    }
                                  }
                                }
                            }   
                        }
           
                  }
            }

      }
    })
    // promise.value.config.url
    // console.log('finished '+idx+' link')
    
  }

    //   Return Dom response data from url
  const getDom = (urls) => {
    const sendCrawlRequest = (url) => {
      return axios.get(url).then((data) => {
        return data;
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

      fulfilledResponses.map((item, idx) => {
        if(item.value === undefined){
            return
        }
        crawlDom(item, idx)
      })
    }).finally(() => {
        
        crawledData.map((item) => {
            const urls = item.map((url, idx) => {
                return axios.get(url).then((response) => {
                    response.idx = idx;
                    return response
                }).catch((error) => {
                    console.error('Error:', error.message)
                    // console.error('Stack trace:', error.stack)
              
                    // Retry the request
                    console.log(`Retrying request to ${url}...`)
                    // return axios.get(url)
                })
            })

            Promise.all(urls).then((response) => {
                let _url;
                if(response[0] === undefined){
                  _url = 'bad url'
                }else{
                  _url = response[0].request.host;                
                  siteEmails[response[0].idx] = [_url, response[0].config.url];

                  const $ = cheerio.load(response[0].data);
                  $('body').find('a').map((a) => {
                      let href = $('body').find('a')[a].attribs.href;
                      if(!(href === undefined)){
                          if(href.search(/mailto/i) > -1){
                              siteEmails[response[0].idx].push(href)
                          }
                      }
                  })
                }

                
            }).finally(() => {
                writeToExcelFile(siteEmails)
                // console.log(siteEmails)
            })
        })
    })

  }

  getDom([
    'https://www.dallasnews.com/',
'https://www.houstonchronicle.com/',
'https://www.texastribune.org/',
'https://www.kvue.com/',
'https://www.ksat.com/',
'https://www.nbcdfw.com/',
'https://www.myfoxzone.com/',
'https://www.star-telegram.com/',
'https://www.news-journal.com/',
'https://www.mysanantonio.com/',
'https://www.wfaa.com/'
  ])
  
  res.send({"Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file."})

})

app.get('/urls?*', function (req, res) {
  console.log(req.query)
})

    
app.listen(5001)

// https://www.amarillo.com/
// https://www.statesman.com/
// https://www.brownsvilleherald.com/
// https://www.caller.com/
// https://www.sanmarcosrecord.com/
// https://dentonrc.com/
// https://elpasoheraldpost.com/
// https://fortworthbusiness.com/
// https://www.galvnews.com/
// https://www.lmtonline.com/
// https://www.news-journal.com/
// https://www.lubbockonline.com/
// https://www.themonitor.com/
// https://www.oaoa.com/
// https://www.panews.com/
// https://www.gosanangelo.com/
// https://www.texarkanagazette.com/
// https://tylerpaper.com/
// https://www.victoriaadvocate.com/
// https://www.timesrecordnews.com/