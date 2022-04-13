const MongoClient = require("../db/db");
const url = "mongodb://localhost:27017/";


class Controller {
    static async controller(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                const dbo = db.db("test");

                dbo.createCollection("customers", function (err, res) {
                    if (err) throw err;
                    console.log("Collection created!");
                    db.close();
                });
            });
        } catch (e) {

        }
    }

    static async controller2(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = [
                    { name: 'adi', address: 'Highway 71' },
                    { name: 'Pmit', address: 'Lowstreet 4' },
                    { name: 'john', address: 'Apple st 652' },
                    { name: 'gourav', address: 'Mountain 21' },
                    { name: 'sourav', address: 'Valley 345' },
                    { name: 'Sandy', address: 'Ocean blvd 2' },
                    { name: 'Betty', address: 'Green Grass 1' },
                    { name: 'Richard', address: 'Sky st 331' },
                    { name: 'Susan', address: 'One way 98' },
                    { name: 'Vicky', address: 'Yellow Garden 2' },
                    { name: 'Ben', address: 'Park Lane 38' },
                    { name: 'William', address: 'Central st 954' },
                    { name: 'Chuck', address: 'Main Road 989' },
                    { name: 'Viola', address: 'Sideway 1633' }
                ];
                dbo.collection("customers").insertMany(myobj, function (err, result) {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + result.insertedCount);
                    res.send(result)

                    db.close();
                });
            });
        } catch (e) {

        }
    }
    static async controller3(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result)
                    db.close();
                });
            });
        } catch (e) {

        }
    }

    //Filter the Result

    static async controller4(req, res) {
        try {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var query = { address: "Park Lane 38" };
                dbo.collection("customers").find(query).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result);
                    db.close();
                });
            });
        } catch (e) {

        }
    }

    //sort result ascending(1) or descending(-1)

    static async controller5(req, res) {
        try {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var mysort = { name: 1 };
                dbo.collection("customers").find().sort(mysort).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    res.send(result)
                    db.close();
                });
            });
        } catch (e) {

        }
    }

    //delete document

    static async controller6(req, res) {
        try {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var query = { address: 'Mountain 21' };
                dbo.collection("customers").deleteMany(query, function (err, obj) {

                    if (err) throw err;
                    console.log(obj);
                    res.send(obj)
                    db.close();
                });
            });
        } catch (e) {

        }
    }

    // update document
    static async controller7(req, res) {
        try {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myquery = { address: /^S/ };
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