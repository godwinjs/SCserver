const axios = require("axios")
const cheerio = require("cheerio")
// const crawler = require("cheerio-crawler")
const express = require('express')
const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node')

// Table Tennis
// 
const app = express()

// Cors error bypass
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  })

app.get('/url?*', function (req, res) {
  
    let allRows = []; 
    let sheetArr = [];
    let newSheet = null;
    //
    const sheets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
        // 

        await writeXlsxFile(objects, {
            schema,
            filePath: './link.xlsx'
        })
    }
    function removeDuplicates(existingSheet, newSheet) {
        existingSheet.shift();

        existingSheet.map((existingRow, idxExist) => {   
      
            newSheet.map((newRow, idxNew) => {
                let rep = 0;

                if(existingRow[0] === newRow[0]){
                    // console.log(newRow[0])
                    newSheet.splice(idxNew, 1)
                    // console.log(newSheet[idxNew])
                }
                newSheet.map((rowAgainst, idxAgainst) =>{
                    if(newRow[0] === rowAgainst[0]){
                        if(rep >= 1){
                            console.log(newRow[0])
                          newSheet.splice(idxAgainst, 1)
                        }
                        rep = rep + 1;
                      }
                })
            })
      
          })
    }
    
    const checkPromise = sheets.map((sheet) => {
        return readXlsxFile("./AllKeywords.xlsx", {sheet: sheet});
    })

    Promise.all(checkPromise).then((rows) => {
        rows.map((row, i) => {
            sheetArr.push(row)
        })
    }).finally(() => {
        if(newSheet === null){
            newSheet = sheetArr[sheetArr.length - 1]
            console.log(newSheet.length)
            // console.log(sheetArr[sheetArr.length - 1][1])
            sheetArr.pop();
        }

        sheetArr.map((existingSheet) => {
            removeDuplicates(existingSheet, newSheet);
        })
        console.log('Writing unique entries to excel file...')
        writeToExcelFile(newSheet);
        console.log(newSheet.length)
        console.log('All done file ready.')
    });
        
    res.send({"Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file."})
})

    
app.listen(5001)