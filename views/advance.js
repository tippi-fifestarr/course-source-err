const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



// Connection URL
const url = 'mongodb://tippiFS:fcbk2020@cluster0.icrot.mongodb.net/input?retryWrites=true&w=majority';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
    const db = client.db("input");
    var cursor = db.collection('students').find({
        
    });
    function iterateFunc(doc) {
        console.log(JSON.stringify(doc, null, 4));
     }
     
     function errorFunc(error) {
        console.log(error);
     }
     
     cursor.forEach(iterateFunc, errorFunc);
  assert.equal(null, err);
  client.close();
});