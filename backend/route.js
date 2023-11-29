const app = require("./app");
const express = require("express");
const cookie = require('cookie-parser')
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");

app.use(express.json());

app.use(cookie())
app.use(products);
app.use(users);
app.use(orders);
