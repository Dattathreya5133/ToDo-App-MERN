import { MongoClient } from "mongodb";

const url = "mongodb://RamaKrishna:RamaKrishna151@ac-vedxjb4-shard-00-00.ul41zty.mongodb.net:27017,ac-vedxjb4-shard-00-01.ul41zty.mongodb.net:27017,ac-vedxjb4-shard-00-02.ul41zty.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ef7q-shard-0&authSource=admin&appName=ToDo-MERN"
const dbName = 'Todo-mern';
const collectionName = 'todolist'
const client = new MongoClient(url)
const connection = async ()=>{
    const connect = await 
    client.connect();
    return connect.db(dbName)
}

export {connection,collectionName};