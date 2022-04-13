const MongoClient = require('mongodb').MongoClient


const url = "mongodb://127.0.0.1:27017/test";
MongoClient.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    function (err, db) {
        if (err) throw err;
        else {
            console.log("Database created!");
        }
        db.close();
    });


module.exports = MongoClient;



// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // authSource: "admin",
// };
// mongoose
//     .connect(url, options)
//     .then(() => {   
//         console.info(`Mongodb connection done`);     
//     })
//     .catch((err) => {
//         console.error(`Mongodb error`, err);
//         // process.exit(1);
//     });

// /*MongoClient.connect(url,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         authSource: "admin"
//     },
//     function (err, db) {
//         if (err) throw err;
//         else { 
//             console.log("Database created!");
//         }
//         db.close();
//     }); */


// // module.exports = MongoClient;