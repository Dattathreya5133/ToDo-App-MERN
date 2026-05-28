import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from 'cors'
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";


const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API running");
});

app.post("/add-task", verifyJWTToken,async (req, res) => {

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

app.post("/signup", async (req, res) => {
    try {
         
        console.log("Signup route started");
        const userData = req.body;

       console.log("Connecting DB");

        if (userData.name &&
            userData.email &&
            userData.password) {

            const db = await connection();

        console.log("DB Connected");

            const collection = db.collection("users");

            const result = await collection.insertOne(userData);
             console.log("Insert Result:", result);

            if(result){
                jwt.sign(
                    userData,
                    "Google",
                    {expiresIn:"10d"},
                    (error,token)=>{
                        res.send({
                            success:true,
                            msg:"signup done",
                            token
                        })
                    }
                )
            }

        }

    } catch(error){
        console.log("SIGNUP ERROR:");
console.log(error);
        res.send({
            success:false,
            message:"try after sometime"
        })
    }
})


app.post("/login", async (req, res) => {

   try {

      const userData = req.body;

      if (
         userData.email &&
         userData.password
      ) {

         const db = await connection();

         const collection = db.collection("users");

         const result = await collection.findOne({
            email: userData.email,
            password: userData.password
         });

         console.log("Found User", result);

         if (result) {

            jwt.sign(
               result,
               "Google",
               { expiresIn: "10d" },

               (error, token) => {

                  if(error){
                     return res.send({
                        success:false,
                        message:"Token error"
                     })
                  }

                  res.send({
                     success: true,
                     msg: "login done",
                     token
                  })

               }
            )

         }
         else {

            res.send({
               message: "user not found",
               success: false
            })

         }

      }
      else {

         res.send({
            message: "login failed",
            success: falsej
         })

      }

   }
   catch(err){

      console.log("Login error:", err);

      res.status(500).send({
         success:false,
         message:err.message
      })

   }

})

app.delete("/delete/:id",verifyJWTToken, async (req, res) => {

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




app.delete("/delete-multiple",verifyJWTToken, async (req, res) => {

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



app.get("/task/:id",verifyJWTToken, async (req, res) => {

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


app.get("/tasks",verifyJWTToken, async (req, res) => {

    console.log("cookies test",req.cookies['token']);

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

app.put("/update-task/:id",verifyJWTToken, async (req, res) => {

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


function verifyJWTToken(req,res,next){

console.log("verifyJWTToken",req.cookies['token']);

const token = req.cookies['token'] || req.headers.authorization

jwt.verify(token,'Google',(error,decoded)=>{

    if(error){
        return res.send({
            msg:'invalid token',
            success:false
        })
    }

    console.log(decoded)
    next()

})
}

const PORT = process.env.PORT || 3300

app.listen(PORT, () => {
  console.log("Server running")
})