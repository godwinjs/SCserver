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
  
    let sheetArr = [];
    let newSheet = null;
    //
    const sheets = [1, 2];
    const objects = []
    const schema = [
    {
        column: 'MEMBER ID',
        type: String,
        value: row => row.memberId
    },
    {
        column: 'SURNAME',
        type: String,
        value: row => row.surname
    },
    {
        column: 'FIRSTNAME',
        type: String,
        value: row => row.firstname
    },
    {
        column: 'GENDER',
        type: String,
        value: row => row.gender
    },
    {
        column: 'COUNTRY',
        type: String,
        value: row => row.country
    },
    {
        column: 'PHONE',
        type: Number,
        value: row => row.phone
    },
    {
        column: 'EMAIL',
        type: String,
        value: row => row.email
    },
    {
        column: 'STATUS',
        type: String,
        value: row => row.status
    }
    ]

    // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
    async function writeToExcelFile(arr) {
        // arr.splice(0, 1)
        arr.map((row) => {


        objects.push({
            memberId: row[0]+'',
            surname: row[1],
            firstname: row[2],
            gender: row[3],
            country:  row[4],
            phone:  +row[5],
            email:  row[6],
            status: row[7]
        })

        })

        await writeXlsxFile(objects, {
            schema,
            filePath: './OrdinaryMembers.xlsx'
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
                }
                newSheet.map((rowAgainst, idxAgainst) =>{
                    if(newRow[0] === rowAgainst[0]){
                        if(rep >= 1){
                          newSheet.splice(idxAgainst, 1)
                        }
                        rep = rep + 1;
                      }
                })
            })
      
          })
    }
    function removeHeader(...arr) {
        arr.map(item => item.shift())
    }
    function stringsMatch(a, b){
        if(a === b){
            return true
        }
        return false
    }

    function TableTennis(a, b){
        a.map((a_row) => {

            b.map((b_row, b_idx) => {
                if(stringsMatch(a_row[1], b_row[0])){
                    b_row[2] = b_row[2] + '(Table Tennis)'
                    // console.log(b_row)
                }
            })
        })
        // console.log(sheetArr[1][1])
    }
    
    const checkPromise = sheets.map((sheet) => {
        return readXlsxFile("./BrunoExcel.xlsx", {sheet: sheet});
    })

    Promise.all(checkPromise).then((rows) => {
        rows.map(row => {
            sheetArr.push(row)
        })
    }).finally(() => {

        removeHeader(sheetArr[0], sheetArr[1]);
        TableTennis(sheetArr[0], sheetArr[1])
        // console.log(sheetArr[1][0][5])

        console.log('Writing unique entries to excel file...')
        writeToExcelFile(sheetArr[1]);
        // console.log(newSheet.length)
        console.log('All done file ready.')
    });
        
    res.send({"Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file."})
})

    
app.listen(5001)