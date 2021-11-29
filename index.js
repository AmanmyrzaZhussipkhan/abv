const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express();
const puppeteer = require('puppeteer');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static("./public"))
// Connection URL
// Database Name
const dbName = 'myproject';
// mongodb+srv://akhan:dlqMCUE1S6maH0rq@abvolunt.aitij.gcp.mongodb.net/users?retryWrites=true&w=majority
//mongodb+srv://aman:aman123@cluster0.pp82c.mongodb.net/test


        MongoClient.connect("mongodb+srv://akhan:dlqMCUE1S6maH0rq@abvolunt.aitij.gcp.mongodb.net/users?retryWrites=true&w=majority",
            async function (err, client) {
                
                if(err) throw new Error;
                
                console.log('Connected successfully to server');
                const db = client.db("abvolunt");
                const users = db.collection("users");

            app.get("/", (req, res) => {
                res.sendFile('./index.html', { root: __dirname })
            })
            app.post("/", async (req, res) => {

                let data = req.body
                for (const [key, value] of Object.entries(req.body)) {
                    if (!value) {
                        res.status(200).send("Error not all data is set")
                    }
                }
          

                let insertObj = {
                    firstName: data.fname,
                    surname: data.surname,
                    place: data.place,
                    email: data.email,
                    age: data.age,
                }
                await users.insertOne(insertObj);
                res.redirect("/");
            })
                


                app.get('/sorting', async (req, res) => {
                    res.sendFile(__dirname + '/sorting.html');
                })

                app.get('/sortedages', async (req, res) => {
                    var ages = await client.db("abvolunt").collection("users").find(
                        {}).sort({ "age": 1 }).toArray();
                    res.send(ages)
                })

                app.get('/forages', async (req, res) => {
                    var ages = await client.db("abvolunt").collection("users").find(
                        {}, { "age": 1, "_id": 0, "firstName": 0, "surname": 0, "place": 0, "email": 0 }
                    ).sort({ "firstName": 1 }).toArray();

                    const result = []
                    for (const i in ages){
                        let res = { name: ages[i].firstName, age: ages[i].age }
                        result.push(res)
                    }
                    res.send(result)
                })

                    
                app.get('/getsorted', async (req, res) => {
                    
                    var Mdata = await client.db("abvolunt").collection("users").find(
  {},
  {_id: 0,surname: 0,place: 0,email: 0}
                    ).sort({ "firstName": 1 }).toArray();


                    
                    console.log(Mdata);
                    res.json(Mdata);
            })

            app.listen(3000, () => console.log('server is listening on port 3000'))
        });
 