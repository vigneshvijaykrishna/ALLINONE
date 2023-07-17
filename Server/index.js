const express = require('express');
const fs = require('fs');
const app = express();
const readline = require('readline');
const csv = require('csv-parser');
const cors = require("cors");


// handling CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
			"http://localhost:4200");
	res.header("Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(cors());

//read data from txt file
app.get('/api/data', (req, res) => {
var filepath = '/home/vkchlt0731/Downloads/du_stats_23_07_03_15_46_39.txt'

    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading file');
      } else {

        res.send(data);
      }
    });
  });


  //convert csv into JSON
  app.get('/csv', (req, res) => {
    const results = [];
    
    fs.createReadStream('/home/vkchlt0731/Downloads/cu_stats_23_06_29_12_28_30.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      });
  });

    //convert csv into JSON
    app.get('/csvkey', (req, res) => {
      var results = [];
      var splitend = [];
      fs.createReadStream('/home/vkchlt0731/Downloads/cu_stats_23_06_29_12_28_30.csv')
        .pipe(csv())
        .on('data', (data) => 
        results.push(data)
        )
        .on('end', () => {
        results =  results[results.length - 1]
        var res1 = Object.values(results)
        console.log("result1:",res1)
        res1.forEach((emp)=>{
          console.log("FORSPLIT:",emp)
          splitend.push(emp.split(':'))
        })
        console.log("SPLIT_EDN:",splitend)
        const keyvaluePairs = splitend.reduce((result,[key,value])=>{
          result[key] = value;
          return result;
        },{})

        res.json(keyvaluePairs);

        });
    });
  



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
