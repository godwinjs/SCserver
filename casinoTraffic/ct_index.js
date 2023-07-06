const writeXlsxFile = require('write-excel-file/node')

const objects = []
const schema = [
  {
      column: 'Domain',
      type: String,
      value: row => row.domain
  },
  {
      column: 'visits',
      type: String,
      value: row => row.visits
  }
]
const linksArr = []

async function writeToExcelFile(arr) {
  // arr.splice(0, 1)
  arr.map((row) => {
    objects.push({
        domain: row.domain,
        visits: row.visits
    })
  })

  await writeXlsxFile(objects, {
      schema,
      filePath: './search/link.xlsx'
  })
}
