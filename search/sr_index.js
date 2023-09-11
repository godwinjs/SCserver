// Godwin AIzaSyBbrInm6_J6JISzssswvL5H4LutUcGrZjY a456b08e41556452f
// micheals AIzaSyBucGedeIyKrZUK3tiaIl4HPAUIHIp02wQ f73a975b78f3b44d4
// racheal AIzaSyDNAnRpXdcSILeraCZz5dKx2M3wIbfU_1c 771b06681096c4379
// AIzaSyCt8EZ2e9gBAktpwC_Ne49DG63Rtr6HYVI a40adcaaa38044e08
const axios = require("axios")
const fs = require('fs')
const writeXlsxFile = require('write-excel-file/node')

const apiKey = 'AIzaSyCt8EZ2e9gBAktpwC_Ne49DG63Rtr6HYVI'; // Replace with your Google Search API key
const searchEngineId = 'a40adcaaa38044e08'; // Replace with your Search Engine ID
const query = 'sports betting sites in Georgia'; // Replace with your desired search query
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

const linksArr = []

let numStart = 29200000;

async function writeToExcelFile(arr) {
  // arr.splice(0, 1)
  arr.map((row) => {
    objects.push({
        domain: row.domain,
        url: row.url,
        pageAs: row[2] === null ? 0 : row[2],
        refDomain: row[3] === null ? 0 : row[3],
        backlinks:  row[4] === null ? 0 : row[4],
        searchTraffic:  row[5] === null ? 0 : row[5],
        urlKeywords:  row[6] === null ? 0 : row[6],
        name: row[7] || '',
        email: row[8] || '',
        emailVerified: row[9] || false
    })
  })
  // 
  // console.log(objects)

  await writeXlsxFile(objects, {
      schema,
      filePath: './search/link.xlsx'
  })
}

let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

(numStart) => {
  let count = 0;

  function run(){
    let startIdx = numStart - count;
    // console.log(numStart)
    // console.log(count)
    // console.log(startIdx)

    axios.get(url + `&start=${21}`).then((d) => {
      if(d){
          console.log(d.data.queries)

            d.data.items.map((item) => {
              let domain = item.displayLink;

              if(item.displayLink.includes('www.')){
                domain = item.displayLink.replace('www.', '')
              }
              linksArr.push({domain: domain, url: item.link})
            })
          }

      if(count < limit){
        setTimeout(() => {
          // run()
        }, 10000)
      }

      let json = JSON.stringify(linksArr)
      fs.writeFile('linksjsonfile.json', json, () => {});
      console.log(linksArr)
    })

    count += 10;
  }
  run()

  if(count >= limit){
    
    console.log(linksArr)
    fs.readFile('linksjsonfile.json', (e, d) => {
      // JSON.parse(e)
      let data = JSON.parse(d)
      console.log(data.length)
      
      writeToExcelFile(data)
    });
  }

  }
  // (numStart, limit = 100)

  fs.readFile('linksjsonfile.json', (e, d) => {
    // JSON.parse(e)
    let data = JSON.parse(d)
    console.log('lenght ' + data.length)
    
    writeToExcelFile(data)
  });
/*
  response.data :::all data from search

  data.items :::array of search results
  data.items.link :::url link
  data.items.displayLink :::domain name

  data.queries.request
  data.queries.nextPage

  template: 'https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json'
*/