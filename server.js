// 12.03.2020 4:40 the mission is a step. the music in my can.  can i? yes i can. 
// what is step 0? clean it up.  step 1 (spin cycle partial)
let redirect_ejs = "success"
const resultsArr = []
// get the users ip info
var ip = require('ip')
dispIP = ip.address() // my ip address
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tippiFS:fcbk2020@cluster0.icrot.mongodb.net/input?retryWrites=true&w=majority";
console.log('dreaming of success')

var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true});
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 10000, 'funky');

let timer
worldCycle
function worldCycle(){
  setTimer()
  function setTimer(){
    let x = setInterval(function() {
      timer++
    }, 999)
}
}
// step 1 (moved timer into ejs portal partial)
// step 2 spin the earth (between asia/americas)
// step 3 get icon from user
// step 4 redirect success and retreive relavent document from mong
// step 5 connect all at once 
// step 6 

app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// get the stuff and put it on front and credit
app.get('/', (req, res) => {

  const data = {
    icon: 'user-graduate',
    ipinfo: dispIP,
    itimer: timer
  }
  const worlds = [
    {
    name : "america",
    url : '../public/camel(kick).mp3',
    icon : 'globe-americas',
    pulse : 'spin'
  },
  {
    name : "china",
    url : '../public/camel(snare).mp3',
    icon : 'globe-asia',
    pulse : 'pulse'
  }
  ]
  // <i class="fab fa-node-js"></i>
  res.render('portal', {
    data: data, worlds: worlds
  });
});

// post is for sending from front end to back end
app.post('/', (req, res) => {
  // destructuring req.body which apparently is undefined
  const {
    name,
    iconname,
    itimer,
    sex
  } = req.body
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
      const doc = {
        name,
        iconname,
        itimer,
        sex
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
  // sent to database, PRISC next step is do i have to pass data.name through to the next page?
  res.redirect('/tutorialpurgatory')
  resultsArr.push(name)
  resultsArr.push(iconname)
  // , {name: name, email:email, favoriteColor: favoriteColor, homeTown: homeTown})
  //   sends to sex page
  // maybe res.
  
})
// PRISC could be here
app.get('/tutorialpurgatory', (req, res) => {

// this is the simplest way to start without promises
  console.log('test', resultsArr)
      console.log("before success" + resultsArr)
      res.render('tutorialpurgatory', {
        name: resultsArr
     });

})

app.get('/success', (req, res) => {
    console.log('success test means the data went through')
    
    const client = new MongoClient(uri);
    success()
    async function success() {
    // The render method takes the name of the HTML 
    // page to be rendered as input 
      const resultsArr = []
      try {
      // The await operator is used to wait for a Promise. It can only be used inside an async function.
      await client.connect();
      const database = client.db("input")
      const cursor = database.collections("students").find({})
      cursor.forEach((doc, err)=> {
        resultsArr.push(doc)
      })
      res.render('success.ejs', {
        // data: data
      });
      } catch (e) {
        console.error(e)
      } finally { //we want to be sure 
        await client.close();
      }
    }
    res.render('success.ejs', {
      // data: data
    });
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Example app listening on port ${PORT}!'));