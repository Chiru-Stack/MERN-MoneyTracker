const express = require("express");
const cors = require("cors");
const app = express();
const Transaction = require("./models/Transactions");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
	res.json({ body: "testok" });
});

app.post("/api/transaction", async(req, res) => {
	await mongoose.connect(process.env.MONGO_URI);
	const { name,price, description, datetime } = req.body;
	const transaction=await Transaction.create({name,price,description,datetime});
	res.json(transaction);
});

app.get('/api/transactions',async(req,res)=>{
	await mongoose.connect(process.env.MONGO_URI);
	const transactions=await Transaction.find({});
	res.json(transactions);
});
app.listen(4040, () => {
	console.log("server listening on 4040");
});
