const csv = require('csvtojson')
const util = require('util');
const fs = require("fs");
const path = require('node:path');


const csvFilePath = path.resolve(__dirname, './example.csv');
const outputPath = path.resolve(__dirname, '../src/data/example.json');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {


    let updatedJson

    // Filter out blanks
    updatedJson = jsonObj.filter(item => {
      if(item.Name == ""){
        return false
      }
      return true
    })


    // ---- Transform Values ---- //

    updatedJson = updatedJson.map(row => {

      const categoriesMap = {
        "Example Key": "example",
      }

      row.categories = row.categories.split(',')
      row.categories = row.categories.map((cat) => {
        if(categoriesMap.hasOwnProperty(cat)){
          return categoriesMap[cat]
        }
        return cat
      })

      return row
    })

    // save it to a file
    fs.writeFileSync(outputPath, JSON.stringify(updatedJson));

    console.log("Saved file!")
  })