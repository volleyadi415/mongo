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
                if (err) return console.error(err)
                console.log('Connected to Database')
                

                var dbo = db.db("mydb");
                var myobj = [
                    { name: 'adi', salary:'5' },
                    { name: 'Ben',salary:'8'  },
                    { name: 'Willia',salary:'10'  },
                    { name: 'Chuck',salary:'7'  },
                    { name: 'Viola',salary:'9'  }
                ];
                dbo.collection("customers").insertMany(myobj, function (err, result) {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + result.insertedCount);
                    res.send(result)

                    
                });
            });
        } catch (e) {

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