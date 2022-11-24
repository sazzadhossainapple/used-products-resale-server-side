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
  } finally {
  }
}
run().catch((error) => console.log(error));
app.listen(port, () => {
  console.log(`E-Shoppers server on running port ${port}`);
});
