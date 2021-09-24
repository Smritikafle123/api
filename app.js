const mongoose = require('mongoose');//Third party
const express = require('express');//Third party
const bodyParser = require('body-parser')// core modules
const cors= require('cors')// grants permission

const db = require('./database/db');
const customer_route = require('./routes/customer_route');
const productRoute= require('./routes/productRoute');
const bookingRoute = require('./routes/bookingRoute');
const ratingRoute = require('./routes/ratingRoute');
const path= require("path");

const app = express();
app.use("/images",express.static(path.join(__dirname,"images")))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(cors());
app.use(customer_route);
app.use(productRoute);
app.use(bookingRoute)
app.use(ratingRoute)


app.listen(90);