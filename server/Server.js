const express = require('express');

const app = express();

const port = 8000;


// Enable CORS for any origin

app.use((req, res, next) => {

res.setHeader('Access-Control-Allow-Origin', '*');

res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

next();

});


app.use(express.json());


// A dictionary to store the items created

const items = {};


// Serve the modified HTML file

app.use(express.static('public'));


// Filter items by user ID or return all items

app.get('/items', (req, res) => {

const { user_id } = req.query;

if (user_id) {

const filteredItems = Object.values(items).filter(item => item.user_id === user_id);

res.status(200).json(filteredItems);

} else {

res.status(200).json(Object.values(items));

}

});


// Get a specific item by its ID

app.get('/item/:id', (req, res) => {

const { id } = req.params;

if (items.hasOwnProperty(id)) {

res.status(200).json(items[id]);

} else {

res.status(404).json({ message: 'Item not found' });

}

});


// Create a new item

app.post('/item', (req, res) => {

const { user_id, description, keywords, lat, lon } = req.body;

if (!user_id || !description || !keywords || !lat || !lon) {

res.status(400).json({ message: 'Missing fields' });

} else {

const id = Object.keys(items).length + 1;

const newItem = {

id,

user_id,

description,

keywords,

lat,

lon,

date_from: new Date().toISOString().slice(0, 10),

};

items[id] = newItem;

res.status(201).json(newItem);

}

});


// Delete an item by its ID

app.delete('/item/:id', (req, res) => {

const { id } = req.params;

if (items.hasOwnProperty(id)) {

delete items[id];

res.sendStatus(204);

} else {

res.status(404).json({ message: 'Item not found' });

}

});


// Handle OPTIONS request for CORS

app.options('*', (req, res) => {

res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

res.sendStatus(204);

});


app.listen(port, () => {

console.log(`Server listening at http://localhost:${port}`);

});
