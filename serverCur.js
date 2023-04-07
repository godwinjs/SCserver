const axios = require("axios")
const cheerio = require("cheerio")
// const crawler = require("cheerio-crawler")
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
  
    let allRows = [];

    // File path.
    // .xlsx    
    const sheets = [1, 2, 3, 4, 5, 6];
    let checkArr = [];
    let againstArr = [];
    //
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
            url: row[1] + "",
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
    
    const checkPromise = sheets.map((sheet) => {
        return readXlsxFile("./AllKeyword.xlsx", {sheet: sheet});
    })

    Promise.all(checkPromise).then((rows) => {
        // console.log(rows.length);
        rows.map((row, i) => {
            checkArr.push(row)
        })
    }).finally(() => {
        // console.log(checkArr.length);
        checkArr.map((row, i) => {
            console.log(row[1])
        })
    })



    
    res.send({"Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file."})
    // res.send({"Success": checkArr})
})

app.get('/urls?*', function (req, res) {
  console.log(req.query)
})

    
app.listen(5001)