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
        let editedObj = [];
        //
        const sheets = [1, 2];
        const spouseObjects = []
        const ordinaryObjects = []

      
        // console.log(queryObject.sport);

    
        // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
        async function writeToExcelFile(arr) {
            // arr.splice(0, 1)
            arr.map((row) => {
                // console.log(row[7])
    
            spouseObjects.push({
                category: row[0] == null ? '' : row[0]+'',
                id: row[1] == null ? '' : row[1]+'',
                name: row[2] == null ? '' : row[2],
                section: row.section == null ? '' : row.section,
                gender:  row.gender == null ? '' : row.gender,
                country:   row.country == null ? '' : row.country,
                phone: row.phone === null ? 0 : row.phone,
                email:  row.email === null ? '' : row.email,
                status: row.status == null ? '' : row.status
            })
            // console.log(row[6].toString())
            // if(row.phone == '8022220222'){
            //     console.log(typeof(row.phone))
            // }
            ordinaryObjects.push({
                memberId:  row.memberId == null ? '' : row.memberId+'',
                surname:  row.surname == null ? '' : row.surname,
                firstname:  row.firstname == null ? '' : row.firstname,
                section: row.section == null ? '' : row.section,
                gender:  row.gender == null ? '' : row.gender,
                country:   row.country == null ? '' : row.country,
                phone: row.phone === null ? '0' : row.phone,
                email:  row.email === null ? '' : row.email,
                status: row.status == null ? '' : row.status
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
                        column: 'COUNTRY',
                        type: String,
                        value: row => row.country
                    },
                    {
                        column: 'GENDER',
                        type: String,
                        value: row => row.gender
                    },
                    {
                        column: 'PHONE NUMBER',
                        type: String,
                        value: row => row.phoneNumber
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
                    filePath: './brunoJob/SpouseMembers.xlsx'
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
                        type: String,
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
                    filePath: './brunoJob/OrdinaryMembers.xlsx'
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
                    let obj = {
                        memberId: b_row[0],
                        surname: b_row[1],
                        firstname: b_row[2],
                        section: null,
                        gender: b_row[3],
                        country: b_row[4],
                        phone: `${b_row[5]}`,
                        email: b_row[6],
                        status: b_row[7],
                    }
                    if(stringsMatch(a_row[1], obj.memberId[1])){
                        if(b_row[1] == null){
                            return;
                        }
                        if(obj.section === null){
                            obj.section = `(${req.query.sport.toUpperCase()})`
                        }else{
                            obj.section = obj.section.toString() + `(${req.query.sport.toUpperCase()})`
                        }
                        // b_row.push(`(${req.query.sport.toUpperCase()})`)
                        editedObj.push(obj);
                    }
                })
            })
        }
        function ordinary(a, b){
            // console.log([b[0], b[1], b[2]])
            a.map((a_row) => {
    
                b.map((b_row) => {
                    let obj = {
                        memberId: b_row[0],
                        surname: b_row[1],
                        firstname: b_row[2],
                        section: null,
                        gender: b_row[3],
                        country: b_row[4],
                        phone: `${b_row[5]}`,
                        email: b_row[6],
                        status: b_row[7],
                    }
                    if(stringsMatch(a_row[1], obj.memberId)){                        
                    if(obj.section === null){
                        obj.section = `(${req.query.sport.toUpperCase()})`
                    }else{
                        obj.section = obj.section.toString() + `(${req.query.sport.toUpperCase()})`
                    }
                    }
                    editedObj.push(obj);
                })
            })
        }
        
        const checkPromise = sheets.map((sheet) => {
            return readXlsxFile("./brunoJob/BrunoExcel.xlsx", {sheet: sheet});
        })
    
        Promise.all(checkPromise).then((rows) => {
            // console.log(rows)
            rows.map(row => {
                sheetArr.push(row)
            })
        }).finally(() => {
            console.log(sheetArr.length)
            removeHeader(sheetArr[0], sheetArr[1]);
            if(req.query.member === 's'){
                console.log('s')
                spouse(sheetArr[0], sheetArr[1])
            }else{
                console.log('o')
                ordinary(sheetArr[0], sheetArr[1])
            }
            // 
            console.log('Writing unique entries to excel file...')
            writeToExcelFile(editedObj);
        // console.log(editedObj[editedObj.length - 3], editedObj[editedObj.length - 2], editedObj[editedObj.length - 1])
            console.log('All done file ready.')
        });
        
    res.send({
        "Success": "Operation Completed and duplicate entries have been removed! \n Enjoy your unique excel file.",
        "arguments": req.query
    })
})
    
app.listen(5001)