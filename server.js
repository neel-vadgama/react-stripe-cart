const express = require("express");
const app = express();
const cors = require("cors");

// you should store it inside .env file for safety
const secretKey = "sk_your_secret_key";

const stripe = require("stripe")(secretKey);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.get("/", async (req, res) => {
  res.json("Hello, This is stripe setup server.");
});

app.post("/create-checkout-session", async (req, res) => {
  const { data } = req.body;
  console.log("items: ", data);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Total Amount",
          },
          unit_amount: parseInt(data.total * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.redirect(303, session.id);
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
