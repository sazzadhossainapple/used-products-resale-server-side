const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

//muddleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kqw4pwk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // database collection
    const productsCatagoreyCollection = client
      .db("E-Shoppers")
      .collection("productsCatagorey");
    const usersCollection = client.db("E-Shoppers").collection("users");
    const addProductCollection = client.db("E-Shoppers").collection("Products");

    app.get("/", (req, res) => {
      res.send({
        status: "success",
        message: "E-Shoppers Server is running.",
      });
    });

    // get all catagory
    app.get("/allcatagory", async (req, res) => {
      const query = {};
      const allCatagory = await productsCatagoreyCollection
        .find(query)
        .toArray();
      res.send(allCatagory);
    });

    //get by catagory id
    app.get("/catagory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const allCatagory = await productsCatagoreyCollection.findOne(query);
      res.send(allCatagory);
    });

    // get users seller and admin
    app.get("/users/seller/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isSeller: user?.role === "Seller" || user?.role === "Admin" });
    });

    // get users admin
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "Admin" });
    });

    // add user
    app.post("/users", async (req, res) => {
      const query = req.body;
      const result = await usersCollection.insertOne(query);
      res.send(result);
    });

    // add products
    app.post("/addProducts", async (req, res) => {
      const query = req.body;
      const date = { date: new Date() };
      const products = await addProductCollection.insertOne({});
    });
  } finally {
  }
}
run().catch((error) => console.log(error));
app.listen(port, () => {
  console.log(`E-Shoppers server on running port ${port}`);
});
