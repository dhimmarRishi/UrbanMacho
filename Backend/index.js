const express = require("express");
const cors = require("cors");
const { productData } = require("./data");
const { authRouter } = require("./routes/auth");
const { mongoose } = require("mongoose");
const { forLoggedUsersOnly } = require("./Middleware/verify");
const { cartRouter } = require("./routes/cart");

const app = express();
app.use(
  cors({
    origin: "http://localhost:1234",
  })
);
const PORT = 8000;
app.use(express.json())

app.get("/home", async (req, res) => {
  try {
    res.send(productData);
  } catch (e) {
    console.log(e);
    res.send("Error in getting the data");
  }
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(`https://www.zara.com/in/en/${id}?v1=336869710`);
  const pro = await fetch(`https://www.zara.com/in/en/${id}?ajax=true`);
  const proData = await pro.json();

  console.log(proData?.product);
  res.send(proData?.product);
});
app.use("/auth", authRouter);
app.use('/cart', forLoggedUsersOnly , cartRouter)

mongoose
  .connect("mongodb://localhost:27017/Urbanmacho")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("Error in Connection : " + e);
  });

app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
