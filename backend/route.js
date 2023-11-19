const app = require("./app");
const express = require("express");

const products = require("./routes/products");

app.use(express.json());

app.use(products);
