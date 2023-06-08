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
// const pages = [1,2,3,4,5,6,7, 8, 9];
const linksArr = []

let numStart = 1;

async function writeToExcelFile(arr) {
  arr.splice(0, 1)
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
  console.log(objects)

  await writeXlsxFile(objects, {
      schema,
      filePath: './search/link.xlsx'
  })
}
const getSearchData = (url) => {
  // return axios.get(url)
}
fs.readFile('linksjsonfile.json', (e, d) => {
  // JSON.parse(e)
  let data = JSON.parse(d)
  console.log(data.length)
  
  writeToExcelFile(data)
});


const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;



// const searchDataArr = pages.map((item, i) => {
 
//   if(i > 0){
//     numStart = numStart + 10
//   }
//   // let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&start=${11}`;
//   let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&start=${numStart}`;
//   return getSearchData(url)
// })

// Promise.all(searchDataArr).then((res) => {
//   if(res){
//     res[0].data.items.map((item) => {
//       linksArr.push({domain: item.displayLink, url: item.link})
//     })
//     // console.log(res[0].data.items.map((item) => item.link))
//   }
// }).finally(() => {
//   let json = JSON.stringify(linksArr)
//   fs.writeFile('./search/linksjsonfile.json', json, () => {

//   });
//   console.log(linksArr)
// })

/*
  response.data :::all data from search

  data.items :::array of search results
  data.items.link :::url link
  data.items.displayLink :::domain name

  data.queries.request
  data.queries.nextPage



  template: 'https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json'
*/