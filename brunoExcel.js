const axios = require("axios")
const cheerio = require("cheerio")
// const crawler = require("cheerio-crawler")
const express = require('express')
const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node')

// const http = require('https'); // or 'https' for https:// URLs
// const fs = require('fs');

// var download = function(url, dest, cb) {
//     var file = fs.createWriteStream(dest);
//     var request = http.get(url, function(response) {
//       response.pipe(file);
//       file.on('finish', function() {
//         file.close(cb);  // close() is async, call cb after close completes.
//       });
//     }).on('error', function(err) { // Handle errors
//       fs.unlink(dest); // Delete the file async. (But we don't check the result)
//       if (cb) cb(err.message);
//     });
//   };

// 
const app = express()

// Cors error bypass
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  })

app.get('/url', function (req, res) {
    // download("https://docs.google.com/spreadsheets/d/1nUPJ42G2lEWl4akz1LC_aNe9oC67fR7qnDM3qEy9jhQ/edit#gid=2004427024", "BrunoExcel.xlsx", callback)

        let sheetArr = [];
        let newSheet = null;
        //
        const sheets = [1, 2];
        const spouseObjects = []
        const ordinaryObjects = []

      
        // console.log(queryObject.sport);

    
        // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
        async function writeToExcelFile(arr) {
            // arr.splice(0, 1)
            arr.map((row) => {
    
    
            spouseObjects.push({
                category: row[0] == null ? '' : row[0]+'',
                id: row[1] == null ? '' : row[1]+'',
                name: row[2] == null ? '' : row[2],
                section: row[3] == null ? '' : row[3],
                phoneNumber: row[4] === null ? '' : +row[4],
                gender:  row[5] == null ? '' : row[5],
                emailAddress:  row[6] === null ? '' : row[6],
                status: row[7] == null ? '' : row[7]
            })
            ordinaryObjects.push({
                memberId:  row[0] == null ? '' : row[0]+'',
                surname:  row[1] == null ? '' : row[1],
                firstname:  row[2] == null ? '' : row[2],
                section: row[3] == null ? '' : row[3],
                gender:  row[4] == null ? '' : row[4],
                country:   row[5] == null ? '' : row[5],
                phone:  row[6] === null ? '' : +row[6],
                email: row[7] === null ? '' : row[7],
                status:  row[8] == null ? '' : row[8]+''
            })
    
            })

            if(req.query.member === 's'){
                    // SPOUSE
                    const schema = [
                    {
                        column: 'CATEGORY',
                        type: String,
                        value: row => row.category
                    },
                    {
                        column: 'ID',
                        type: String,
                        value: row => row.id
                    },
                    {
                        column: 'NAME',
                        type: String,
                        value: row => row.name
                    },
                    {
                        column: 'SECTION',
                        type: String,
                        value: row => row.section
                    },
                    {
                        column: 'PHONE NUMBER',
                        type: Number,
                        value: row => row.phoneNumber
                    },
                    {
                        column: 'GENDER',
                        type: String,
                        value: row => row.gender
                    },
                    {
                        column: 'EMAIL ADDRESS',
                        type: String,
                        value: row => row.emailAddress
                    },
                    {
                        column: 'STATUS',
                        type: String,
                        value: row => row.status
                    }
                    ]
                await writeXlsxFile(spouseObjects, {
                    schema,
                    filePath: './SpouseMembers.xlsx'
                })
            }else{
                // ORDINARY
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
                        column: 'SECTION',
                        type: String,
                        value: row => row.section
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
                await writeXlsxFile(ordinaryObjects, {
                    schema,
                    filePath: './OrdinaryMembers.xlsx'
                })
            }

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
    
        function spouse(a, b){
            a.map((a_row) => {
    
                b.map((b_row, b_idx) => {
                    if(stringsMatch(a_row[1], b_row[1])){
                        if(b_row[1] == null){
                            return;
                        }
                        if(b_row[3] === null){
                            b_row[3] = `(${req.query.sport.toUpperCase()})`
                        }else{
                            b_row[3] = b_row[3].toString() + `(${req.query.sport.toUpperCase()})`
                        }
                        // b_row.push(`(${req.query.sport.toUpperCase()})`)
                    }
                })
            })
        }
        function ordinary(a, b){
            a.map((a_row) => {
    
                b.map((b_row) => {
                    if(stringsMatch(a_row[1], b_row[0])){                        
                    if(b_row[3] === null){
                        b_row[3] = `(${req.query.sport.toUpperCase()})`
                    }else{
                        b_row[3] = b_row[3].toString() + `(${req.query.sport.toUpperCase()})`
                    }
                    }
                })
            })
        }
        
        const checkPromise = sheets.map((sheet) => {
            return readXlsxFile("./BrunoExcel.xlsx", {sheet: sheet});
        })
    
        Promise.all(checkPromise).then((rows) => {
            // console.log(rows)
            rows.map(row => {
                sheetArr.push(row)
            })
        }).finally(() => {
    
            removeHeader(sheetArr[0], sheetArr[1]);
            if(req.query.member === 's'){
                spouse(sheetArr[0], sheetArr[1])
            }else{
                ordinary(sheetArr[0], sheetArr[1])
            }
            // 
            console.log('Writing unique entries to excel file...')
            writeToExcelFile(sheetArr[1]);
            console.log('All done file ready.')
        });
        
    res.send({
        "Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file.",
        "arguments": req.query
    })
})

    
app.listen(5001)