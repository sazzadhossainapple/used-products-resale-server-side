const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const port = process.env.PORT || 5000;

const app = express();

//muddleware
app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
  const authVerifyHeader = req.headers.authorization;
  if (!authVerifyHeader) {
    return res.status(401).send("unauthorized access");
  }
  const token = authVerifyHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({
        message: "forbidden access",
      });
    }
    req.decoded = decoded;
    next();
  });
}

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
    const buyerBookProductCollection = client
      .db("E-Shoppers")
      .collection("buyerBookProduct");
    const paymentsCollection = client.db("E-Shoppers").collection("payments");

    app.get("/", (req, res) => {
      res.send({
        status: "success",
        message: "E-Shoppers Server is running.",
      });
    });

    //jwt
    app.put("/jwt/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: query,
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      if (result) {
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
          expiresIn: "1d",
        });
        return res.send({ accessToken: token });
      }
      res.status(403).send({
        accessToken: "",
        massage: "forbidden access",
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

    // get users seller
    app.get("/users/seller/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isSeller: user?.role === "Seller" });
    });
    // get users buyer
    app.get("/users/buyer/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isBuyer: user?.role === "Buyer" });
    });

    // get  admin
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "Admin" });
    });

    // get all seller and Buyer
    app.get("/users", async (req, res) => {
      const role = req.query.role;
      const filter = { role: role };
      const result = await usersCollection.find(filter).toArray();
      res.send(result);
    });

    // admin delete by seller
    app.delete("/seller/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(filter);
      res.send(result);
    });

    // admin delete by buyer
    app.delete("/buyer/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(filter);
      res.send(result);
    });

    // add user
    app.post("/users", async (req, res) => {
      const query = req.body;
      const result = await usersCollection.insertOne(query);
      res.send(result);
    });

    // user seller verified updated
    app.patch("/user/seller/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const upadatedUsers = {
        $set: {
          isVerifed: true,
        },
      };
      const result = await usersCollection.updateOne(filter, upadatedUsers);
      res.send(result);
    });

    // put user
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // add product catagory by id
    app.get("/catagory/:catagoryId", async (req, res) => {
      const catagoryId = req.params.catagoryId;
      const query = { catagoryId: catagoryId };
      const date = { date: -1 };
      const products = await addProductCollection
        .find(query)
        .sort(date)
        .toArray();
      res.send(products);
    });

    // seller product find
    app.get("/sellerProduct/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await addProductCollection.find(filter).toArray();
      res.send(result);
    });

    // seller product delete
    app.delete("/sellerProduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await addProductCollection.deleteOne(filter);
      res.send(result);
    });

    // saller product Advertisement
    app.patch("/sellerProduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          isAdvertisement: true,
        },
      };
      const result = await addProductCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get  Advertisement product
    app.get("/advertisement", verifyJWT, async (req, res) => {
      const result = await addProductCollection
        .find({
          $and: [{ isAdvertisement: true, isSaleStatus: false }],
        })
        .toArray();

      res.send(result);
    });

    // add products
    app.post("/addProducts", async (req, res) => {
      const query = req.body;
      const date = { date: new Date() };
      const products = await addProductCollection.insertOne({
        catagoryId: query.catagoryId,
        productName: query.productName,
        resalePrice: query.resalePrice,
        orginalPrice: query.orginalPrice,
        useYear: query.useYear,
        location: query.location,
        phoneNumber: query.phoneNumber,
        productImage: query.productImage,
        condition: query.condition,
        description: query.description,
        sellerName: query.sellerName,
        email: query.email,
        sellerImage: query.sellerImage,
        reported: false,
        isAdvertisement: false,
        isSaleStatus: false,
        date: date.date,
      });

      res.send(products);
    });

    //get reported products
    app.get("/reportedProduct", async (req, res) => {
      const result = await addProductCollection
        .find({ reported: true })
        .toArray();
      res.send(result);
    });

    // reported products updated
    app.patch("/reportedProduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };

      const updateDoc = {
        $set: {
          reported: true,
        },
      };
      const result = await addProductCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // delete reported product
    app.delete("/reportedProduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await addProductCollection.deleteOne(filter);
      res.send(result);
    });

    // payment intregation
    app.post("/create-payment-intent", async (req, res) => {
      const booking = req.body;
      const price = booking.price;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    //payments
    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      const id1 = payment.bookId;
      const id2 = payment.bookingId;
      const filter1 = { _id: ObjectId(id1) };
      const filter2 = { _id: ObjectId(id2) };
      const updatedDoc1 = {
        $set: {
          isSaleStatus: true,
          transactionId: payment.transactionId,
        },
      };
      const updatedDoc2 = {
        $set: {
          isSaleStatus: true,
          transactionId: payment.transactionId,
        },
      };
      const updatedResult1 = await buyerBookProductCollection.updateOne(
        filter1,
        updatedDoc1
      );
      const updatedResult2 = await addProductCollection.updateOne(
        filter2,
        updatedDoc2
      );
      res.send(result);
    });

    // buyer get all products
    app.get("/buyerBookProducts", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const allBookProducts = await buyerBookProductCollection
        .find(filter)
        .toArray();
      res.send(allBookProducts);
    });

    // buyer product get by id
    app.get("/buyerBookProducts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const buyerBooking = await buyerBookProductCollection.findOne(query);
      res.send(buyerBooking);
    });

    // buyer book products
    app.post("/buyerBookProducts", verifyJWT, async (req, res) => {
      const query = req.body;
      const buyerBookProducts = await buyerBookProductCollection.insertOne(
        query
      );
      res.send(buyerBookProducts);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));
app.listen(port, () => {
  console.log(`E-Shoppers server on running port ${port}`);
});
