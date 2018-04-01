//Create server

const express = require('express');
app = express();
const port = process.env.PORT || 4080;
app.use(express.static('public'));
app.listen(port);