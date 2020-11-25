const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('https://en.wikipedia.org/wiki/Ken_Burns_effect')
  // res.write('Hello World!')
// why doesnt this work?  
// req.prompt(input)
//   res.send(input)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const {MongoClient} = require('mongodb');

async function main(){
  // https://docs.atlas.mongodb.com/connect-to-cluster/
  // const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://tippiFS:fcbk2020@cluster0.icrot.mongodb.net/database_dan?retryWrites=true&w=majority";
  // now that we have our URI, create an instance of mongoClient
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // this may give DepreciationWarnings arount URL string parser, try above or troubleshoot
  const client = new MongoClient(uri);
  // lets wrap our calls to functions that interact with a database in a try/catch
  // statement so we can handle any unexpected errors
  try{
    // The await operator is used to wait for a Promise. It can only be used inside an async function.
    await client.connect();
    await listDatabases(client); //function to print the names of the databases in cluster
    // https://docs.mongodb.com/drivers/node/fundamentals/crud/write-operations/insert
    // https://docs.mongodb.com/drivers/node/fundamentals/crud/read-operations/retrieve
    // create variables that can plug into the find?
    const database = client.db("database_dan")
    const collection = database.collection("collection0")
    // insert this
    const doc = { name: "Red", town: "the mongo" };
    const result = await collection.insertOne(doc);
    // insertedCount makes sure
    console.log(

      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,

    );
    // the find() will return a cursor, the findOne() returns a document
    const cursor = collection.find();
    // if no documents are found return a message
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(console.dir);
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

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// this is the mongodb stuff from the website here and this is what it is
// const { MongoClient } = require('mongodb');
// const fs = require('fs');

// const credentials = fs.readFileSync('<path_to_certificate>');

// const client = new MongoClient('mongodb+srv://tippiFS:<fcbk2020>@cluster0.icrot.mongodb.net/<dbname>?retryWrites=true&w=majority', {
//   sslKey: credentials,
//   sslCert: credentials
// });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("testDB");
//     const collection = database.collection("testCol");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
