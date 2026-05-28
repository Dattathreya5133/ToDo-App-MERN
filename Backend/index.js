import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from 'cors'
import { ObjectId } from "mongodb";


const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("API running");
});

app.post("/add-task",async (req, res) => {

    console.log(req.body);

    const db = await connection();

    const collection = await
        db.collection(collectionName);

    const result = await
        collection.insertOne(req.body);

    if (result) {
        res.send({
            message: "New Task Added",
            success: true,
            result
        });
        res.send(error.message);
    } else {
        res.send({
            message: "Task not added",
            success: false,
            result
        })
    }
});



app.delete("/delete/:id", async (req, res) => {

    console.log(req.body);

    const id = req.params.id

    const db = await connection();

    const collection = await
        db.collection(collectionName);

    const result = await
        collection.deleteOne({ _id: new ObjectId(id) })

    if (result) {
        res.send({ message: "task deleted", success: true });

    } else {
        res.send({ message: "error try after some time", success: false })
    }
});

app.delete("/delete-multiple", async (req, res) => {

    console.log(req.body)

    const ids = req.body.ids;

    const deleteTaskIds =
        ids.map(
            item => new ObjectId(item)
        );

    const db = await connection();

    const collection =
        db.collection(collectionName);

    const result = await
        collection.deleteMany({ _id: { $in: deleteTaskIds } });
    console.log(result);

    if (result) {
        res.send({ message: "Multiple tasks deleted", success: true })
    } else {
        res.send({ message: "error try after some time", success: falsee })
    }
})

app.get("/task/:id", async (req, res) => {

    const id = req.params.id

    const db = await connection();

    const collection = await
        db.collection(collectionName);

    const result = await
        collection.findOne({ _id: new ObjectId(id) });

    if (result) {
        res.send({ message: "tasks fetched", success: true, result: result });

    } else {
        res.send({ message: "error try after some time", success: false })
    }
});

app.get("/tasks",async (req, res) => {

    const db = await connection();

    const collection = await
        db.collection(collectionName);

    const result = await
        collection.find().toArray();

    if (result) {
        res.send({ message: "task lists fetched", success: true, result: result });

    } else {
        res.send({ message: "error try after some time", success: false })
    }
});

app.put("/update-task/:id", async (req, res) => {

    const { id } = req.params
    const { _id, ...fields } = req.body

    const update = { $set: fields }

    const db = await connection()

    const collection = db.collection(collectionName)

    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        update
    )

    if (result) {
        res.send({
            message: "task data updated",
            success: true,
            result: result
        })
    } else {
        res.send({
            message: "error try after some time",
            success: false
        })
    }
})


const PORT = process.env.PORT || 3300

app.listen(PORT, () => {
  console.log("Server running")
})