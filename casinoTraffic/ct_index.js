const fs = require('fs');
const writeXlsxFile = require('write-excel-file/node')

const objects = []
const schema = [
  {
      column: 'Domain',
      type: String,
      value: row => row.domain
  },
  {
      column: 'Visits',
      type: String,
      value: row => row.visits
  }
]

const linksArr = []


async function writeToExcelFile(arr) {
  // arr.splice(0, 1)
  arr.map((row) => {
    objects.push({
        domain: row.url,
        visits: row.visits
    })
  })

  await writeXlsxFile(objects, {
      schema,
      filePath: './casinoTraffic/siteTraffic.xlsx'
  })
}

  fs.readFile('linksjsonfile.json', (e, d) => {
    // JSON.parse(e)
    let data = JSON.parse(d)
    console.log('lenght ' + data.length)
    
    writeToExcelFile(data)
  });
