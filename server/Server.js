const express = require('express');

const app = express();

const port = 8000;



// Test port if open

app.get('/test_port', (req, res) => {
  console.log("IT WORKS!")
  res.sendStatus(201);

});



// Base endpoint should return HTML

app.get('/', (req, res) => {

  res.setHeader('Content-Type', 'text/html');

  res.send('<html><body>Hello, world!</body></html>');

});



// Handle item creation

app.post('/item', (req, res) => {

  // Process the item creation request

  // ...

  res.status(201).json({ id: 'item123' });

});



// Handle item retrieval

app.get('/item/:id', (req, res) => {

  const itemId = req.params.id;

  // Retrieve the item based on the ID

  // ...

  res.status(200).json({ id: itemId, /* item data */ });

});



// Handle item deletion

app.delete('/item/:id', (req, res) => {

  const itemId = req.params.id;

  // Delete the item based on the ID

  // ...

  res.sendStatus(204);

});



// Handle retrieving a list of items

app.get('/items', (req, res) => {

  // Retrieve a list of items

  // ...

  res.status(200).json([/* list of items */]);

});



// Handle OPTIONS request for CORS

app.options('*', (req, res) => {

  res.setHeader('Access-Control-Allow-Methods', 'POST');

  res.sendStatus(204);

});



app.listen(port, () => {

  console.log(`Server listening at http://localhost:${port}`);

});

