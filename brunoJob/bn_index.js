const axios = require("axios")
const cheerio = require("cheerio")
const express = require('express')
const readXlsxFile = require('read-excel-file/node')
const writeXlsxFile = require('write-excel-file/node')

const app = express()

// Cors error bypass
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
  })

app.get('/url', function (req, res) {

        let sheetArr = [];
        //
        const sheets = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const spouseObjects = []
        const ordinaryObjects = []

    
        // "C:\Users\godwi\Downloads\LinkSwapsSimilarSites.xlsx"
        async function writeToExcelFile(arr) {
            arr.map((row) => {
    
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
                ordinaryObjects.push({
                    memberId:  row[0] == null ? '' : row[0]+'',
                    surname:  row[1] == null ? '' : row[1],
                    firstname:  row[2] == null ? '' : row[2],
                    gender:  row[3] == null ? '' : row[3],
                    country:   row[4] == null ? '' : row[4],
                    phone: row[5] === null ? '0' : `${row[5]}`,
                    email:  row[6] === null ? '' : row[6],
                    status: row[7] == null ? '' : row[7],
                    section: row[8] == null ? '' : row[8]
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
                    },
                    {
                        column: 'SECTION',
                        type: String,
                        value: row => row.section
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
                        if(obj.section === null){
                            obj.section = `(${req.query.sport.toUpperCase()})`
                        }else{
                            obj.section = obj.section.toString() + `(${req.query.sport.toUpperCase()})`
                        }
                        editedObj.push(arr);
                    }
                })
            })
        }
        function ordinary(a, b){
            a.map((a_row) => {
                
                b.map((b_row, idx) => {
                    console.log(': '+b_row[0])
                    // 
                    if(stringsMatch(a_row[1], b_row[0])){      
                        if(b_row[8] === undefined){
                            b_row.push(`(${req.query.sport.toUpperCase()})`)
                            return;
                        }
                        if(b_row[8] === null){
                            b_row[8] = `(${req.query.sport.toUpperCase()})`
                            return;
                        }
                            b_row[8] = `${b_row[8]}(${req.query.sport.toUpperCase()})`;
                            // b[idx] = [b_row[0], b_row[1], b_row[2], b_row[3], b_row[4], b_row[5], b_row[6], b_row[7], b[idx][8] + req.query.sport.toUpperCase() ]
                            // obj.section = obj.section.toString() + `(${req.query.sport.toUpperCase()})`
                            // b.splice(idx, 1, [
                            //     ...b_row.slice(0, 7),
                            //     `${b[idx][8] + req.query.sport.toUpperCase()}`
                            // ])

                    }
                })
            })
        }

        const checkPromise = sheets.map((sheet) => {
            return readXlsxFile("./brunoJob/BrunoExcel.xlsx", {sheet: sheet});
        })
    
        Promise.all(checkPromise).then((rows) => {
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
                ordinary(sheetArr[parseInt(req.query.sheet)], sheetArr[0])
            }
            // 
            console.log(`Writing ${sheetArr[0].length} entries to excel file...`)
            console.log([sheetArr[0][0], sheetArr[0][1], sheetArr[0][2], sheetArr[0][18], sheetArr[0][19] ])
            writeToExcelFile(sheetArr[0]);
            console.log('All done file ready.')
        });
        
    res.send({
        "Success": "Operation Completed! \n Enjoy your unique excel file.",
        "arguments": req.query
    })
})
    
app.listen(5001)