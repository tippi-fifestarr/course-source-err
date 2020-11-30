let ejsname = "success"
// this gives us mongo access and MongoClient functions such as .connect 
// const {MongoClient} = require('mongodb');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tippiFS:fcbk2020@cluster0.icrot.mongodb.net/input?retryWrites=true&w=majority";
console.log('dreaming')

var express = require('express');
var app = express();
// this was missing, parse the body+boilerplate
const bodyParser = require("body-parser");
// supossed to haveont
const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true});

// let timer=0;

// all on the front if you want to see the numbers on the front
// setTimer()
// function setTimer(){
// let x = setInterval(function() {
//     timer++
// //    this is where it  // e
//     // location.reload();
//     }, 999)
// }


app.use(express.static(__dirname + '/'));
// Set EJS as templating engine -set name and value - booiler plot
app.set('view engine', 'ejs');
// boilerplate stuff always same in new apps
app.use(bodyParser.urlencoded({
  extended: true
}));
// get the stuff and put it on front and credit
app.get('/', (req, res) => {
  // The render method takes the name of the HTML page to be rendered as input This page should be in the views folder in the root directory. We can pass multiple properties and values 
  const data = {
    name: 'danjo',
    hobbies: [
      '打游戏',
      'WC-MP',
      'skirpaderp'
    ],
    food: [
      '煎饼果子',
      ''

    ]
    // timer
  }
  const disc = [
    {
    name : "kick",
    url : '../public/camel(kick).mp3',
    pulse : 'pulse'
    },
    {
    name : "snare",
    url : '../public/camel(snare).mp3',
    pulse : 'pulse'
    },
    {
    name : "melody",
    url : '../public/camel(melody).mp3',
    pulse : 'spin'
    },
    {
    name : "campbell",
    url : '../public/camel(campbell).mp3',
    pulse : 'spin'
    }
  ]
  // as an object, here we are passing data:data
  res.render('entrance', {
    data: data, disc: disc
  });
});

// post is for sending from front end to back end
app.post('/', (req, res) => {
  // destructuring req.body which apparently is undefined
  const {
    name,
    email,
    favoriteColor,
    homeTown,
    sex
  } = req.body
  //   req.body.name --etc request / response
  var data = {
    name: name,
    email: email,
    favoriteColor: favoriteColor,
    homeTown: homeTown,
    sex: sex
  }
  // console.log(data)
  // here is where we send to database!

  async function main() {

    // this may give DepreciationWarnings arount URL string parser, try above or troubleshoot
    const client = new MongoClient(uri);
    // lets wrap our calls to functions that interact with a database in a try/catch statement so we can handle any unexpected errors
    try {
      // The await operator is used to wait for a Promise. It can only be used inside an async function.
      await client.connect();
      // await listDatabases(client); //function to print the names of the databases in cluster
      // https://docs.mongodb.com/drivers/node/fundamentals/crud/write-operations/insert create variables that can plug into the find?
      const database = client.db("input")
      const collection = database.collection("students")
      // insert this just name and data
      // const doc = { name: data.name, email: data.email };
      const doc = {
        data
      }
      const result = await collection.insertOne(doc);
      // insertedCount makes sure
      console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);
      // the find() will return a cursor, the findOne() returns a document
      const cursor = collection.find();
      // if no documents are found return a message
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      // await cursor.forEach(console.dir);
      // The await expression causes async function execution to pause until a 
      // Promise is settled (that is, fulfilled or rejected), and to resume 
      // execution of the async function after fulfillment. When resumed, the value of the await expression is that of the fulfilled Promise.
    } catch (e) {
      console.error(e)
    } finally { //we want to be sure 
      await client.close();
    }
  }

  main().catch(console.error);

  async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  }
  // sent to database
  res.redirect('/success')
  // , {name: name, email:email, favoriteColor: favoriteColor, homeTown: homeTown})
  //   sends to sex page
  
})

app.get('/success', (req, res) => {
  const resultsArr = []
// this is the simplest way to start without promises
  MongoClient.connect(uri, function(err, client){
    const db = client.db('input')
    // cursor is a pointer to a memory location
    const cursor = db.collection("students").find({})
    // iterates through the "docs", doc=i=1 of the cursor
    cursor.forEach((doc, err)=> {
      // pushing doc into the resultsArr
      resultsArr.push(doc)
    }, function(){
      client.close()
      // console.log(resultsArr)
      res.render(`success.ejs`, {
        data: resultsArr
      })
    })

  })
})

// app.get('/success', (req, res) => {
//     console.log('success test means the data went through')
    
//     const client = new MongoClient(uri);
//     success()
//     async function success() {
//     // The render method takes the name of the HTML 
//     // page to be rendered as input 
//       const resultsArr = []
//       try {
//       // The await operator is used to wait for a Promise. It can only be used inside an async function.
//       await client.connect();
//       const database = client.db("input")
//       const cursor = database.collections("students").find({})
//       cursor.forEach((doc, err)=> {
//         resultsArr.push(doc)
//       })
//       res.render('success.ejs', {
//         // data: data
//       });
//       } catch (e) {
//         console.error(e)
//       } finally { //we want to be sure 
//         await client.close();
//       }
//     }
//     res.render('success.ejs', {
//       // data: data
//     });
// })

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Example app listening on port ${PORT}!'));