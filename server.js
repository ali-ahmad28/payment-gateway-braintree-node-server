const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

require("dotenv").config();

const app = express();

const routes = require('./routes/index')

const morgnaFormat = process.env.NODE_ENV==="production"?"combined":"dev";
app.use(morgan(morgnaFormat))

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

routes(app);

const port = process.env.NODE_ENV == "production" ? 80 : 8000;
const server = http.createServer(app);
server.listen(port);
console.log("Server running on port ",port)