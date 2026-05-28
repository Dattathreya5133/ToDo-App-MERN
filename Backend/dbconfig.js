import { MongoClient } from "mongodb";

const url = "mongodb+srv://RamaKrishna:RamaKrishna151%40@todo-mern.ul41zty.mongodb.net/?appName=ToDo-MERN"
const dbName = 'Todo-mern';
const collectionName = 'todolist'
const client = new MongoClient(url)
const connection = async ()=>{
    const connect = await 
    client.connect();
    return connect.db(dbName)
}

export {connection,collectionName};