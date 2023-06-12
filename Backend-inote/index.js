const express = require('express');
const app = express();
const port = 5000;
const connectToMongo = require('./db');
const path = require('path');
const cors = require('cors');
app.use(cors())
app.use(express.json())
connectToMongo();

// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  console.log("index page")
  res.send("<h1>Home page</h1>");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})