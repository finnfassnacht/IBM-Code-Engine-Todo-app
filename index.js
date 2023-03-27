const { MongoClient } = require("mongodb")
const express = require("express")
const { request } = require("express")
PORT = 8080
const app = express()
app.use(express.static("www"))
app.use(express.json())
const router = express.Router()
app.use("/api", router)
const KEY = process.env.KEY
const uri = "mongodb+srv://"+ String(KEY) +"@cluster0.jsp8z1o.mongodb.net/?retryWrites=true&w=majority"
const database_info = "todoapp";
const client = new MongoClient(uri);
async function write(client, newListing){
    const result = await client.db(database_info).collection("items").insertOne(newListing);
    return result
}
async function read(client){
    const result = await client.db(database_info).collection("items").find({}).toArray();
    return result
}
async function remove(client,data) {
    const result = await client.db(database_info).collection("items").deleteOne(data)
    return result
}

router.get("/newitem/:todo", (req,res) => {
    let todo = req.params.todo
	async function send(){
        await write(client,{"todo":todo})
    }
    send()
    res.send({"status":200})
    res.end()
})

router.get("/items", (req,res) => {
    async function main(){
        let items = await read(client)
        res.json({"items":items})
        res.end()
    }
    main()
})


router.get("/removeitem/:todo", (req,res) => {
    let todo = req.params.todo
	async function send(){
        await remove(client,{"todo":todo})
    }
    send()
    res.send({"status":200})
    res.end()
})

app.listen(PORT, () => {
	console.log("Server is up and running!!")
})