//const MongoClient = require("../db/db");
const MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb://127.0.0.1/mydb"


class Controller {
    static async collection(req, res) {
        try {
            MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, db) => {
                if (err) return console.error(err)
                console.log('Connected to Database')
                var dbo = db.db("mydb");


                dbo.createCollection("customers", function (err, res) {
                    if (err) throw err;
                    console.log("Collection created!");
                    db.close();
                });
            });
        } catch  (e) {
            console.log(e)

        }
    }

    static async insert(req, res) {
        try {
            MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, db) => {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = [
                    { name: 'John', address: 'Highway 71' , salary:2000 },
                    { name: 'Peter', address: 'Lowstreet 4' , salary:25000 },
                    { name: 'Amy', address: 'Apple st 652' , salary:26000},
                    { name: 'Hannah', address: 'Mountain 21', salary:23000 },
                    { name: 'Michael', address: 'Valley 345' , salary:26000},
                    { name: 'Sandy', address: 'Ocean blvd 2' , salary:21000},
                    { name: 'Betty', address: 'Green Grass 1' , salary:27000},
                    { name: 'Richard', address: 'Sky st 331' , salary:22000},
                    { name: 'Susan', address: 'One way 98' , salary:29000},
                    { name: 'Vicky', address: 'Yellow Garden 2' , salary:29000},
                    { name: 'Ben', address: 'Park Lane 38', salary:40000 },
                    { name: 'William', address: 'Central st 954' , salary:20000},
                    { name: 'Chuck', address: 'Main Road 989', salary:20500 },
                    { name: 'Viola', address: 'Sideway 1633', salary:30000 },
                
                ];
                
                dbo.collection("customers").insertMany(myobj, async function (err, result) {
                    const data = await dbo.collection("customers").createIndex({ name: 1 });
                    console.log(`Index created: ${data}`);
                    if (err) throw err;
                    console.log("Number of documents inserted: " + result.insertedCount);
                    res.send(result)

                    db.close();
                });
            });
        } catch (e) {
            console.log(e)
        }
    }
    static async select(req, res) {
        try {
          
            MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, db) => {
                if (err) return console.error(err)
                console.log('Connected to Database')
                var dbo = db.db("mydb");
            dbo.collection("customers").find({}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              res.send(result);
            });
              })
            
        } catch (e) {

        }
    }

    //Filter the Result

    static async filter(req, res) {
        try {

            MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, db) => {
                if (err) return console.error(err)
                console.log('Connected to Database')
                var dbo = db.db("mydb");

                
                var query = { name: "adi" };
                dbo.collection("customers").find(query).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);
                    
                });
            });
        } catch (e) {

        }
    }

    //sort result ascending(1) or descending(-1)

    static async sort(req, res) {
        try {

            MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, db) => {
                if (err) return console.error(err)
                console.log('Connected to Database')
                var dbo = db.db("mydb");

        
                dbo.collection("customers")
                .aggregate([
                    { 
                      $match: {
                        
                      }
                    }, {
                      $group: {
                        _id: null,
                        total: {
                          $sum: "$salary"
                        },
                        average_transaction_amount: {
                          $avg: "$salary"
                        },
                        min_transaction_amount: {
                          $min: "$salary"
                        },
                        max_transaction_amount: {
                          $max: "$salary"
                        }
                      }
                    }
                  ])
                .toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);

                    db.close();
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    // update document
    static async update(req, res) {
        try {

            MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, db) => {
                if (err) return console.error(err)
                console.log('Connected to Database')
                var dbo = db.db("mydb");

                var myquery = { name: "aditya" };
                var newvalues = { $set: { name: "Minnie" } };
                dbo.collection("customers").updateMany(myquery, newvalues, function (err, result) {
                    if (err) throw err;
                    console.log(result.result.nModified + " document(s) updated");
                    console.log(result);
                    res.send(result);
                    db.close();
                });
            });
        } catch (error) {

        }
    }
}

module.exports = Controller