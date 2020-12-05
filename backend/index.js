// Node imports
const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csvtojson');
const cors = require('cors');

// Model types
const Graph = require('./graph/Graph.js');
const { airports } = require('./data/airports');

// Add extension to String type
String.prototype.toSearch = function() {
  const chars = ['aáàãäâ', 'eéèëê', 'iíìïî', 'oóòõöô', 'uúùüû'];
  let value = this;
  for (var i in chars) {
    value = value.replace(new RegExp('[' + chars[i] + ']', 'g'), '[' + chars[i] + ']');
  }
  return new RegExp(value);
};

// Process CSV
let data;
csv({ delimiter: ';' })
  .fromFile('./data/flights.CSV')
  .then((flights) => {
    // Insert CSV data into a graph
    const graph = new Graph();

    // Add graph nodes
    flights.forEach(({ origin }) => {
      graph.addNode(origin);
    });

    // Add graph edges
    flights.forEach((flight) => {
      graph.addEdge(flight.origin, flight.destination, flight.price);
    });

    data = graph;
  });

// Create Express App
const app = express();
const port = 5000;

// Apply plugins
app.use(bodyParser.json())
app.use(cors());

// Query endpoint to search for a airport by name
// Params
// @ term: String -> Term to search for airports
app.get('/query', (req, res) => {
  const term = req.query.term.toSearch();

  const query = Object
    .entries(airports)
    .map(([code, name]) => ({ code, name }))
    .filter(({ name }) => name.toLowerCase().search(term) > -1)

  return res.send(query);
});

// Search for a trip by origin and destination
// Params
// @ origin: String -> Code of origin airport
// @ destination: String -> Code of destination airport
// @ ow: Boolean -> Only way trip
app.get('/search', async(req, res) => {
  const origin = req.query.origin;
  const destination = req.query.destination;

  const item = data.djikstraAlgorithm(origin, destination);
  
  return res.send(item);
});

// Start the Express App
app.listen(port, () => console.log(`Server listening on port ${port}!`));
