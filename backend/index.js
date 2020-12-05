// Node imports
const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csvtojson');
const cors = require('cors');

// Model types
const Graph = require('./graph/Graph.js');
const GraphEdge = require('./graph/GraphEdge.js');
const GraphVertex = require('./graph/GraphVertex.js');
const { bellmanFord } = require('./graph/bellman-ford/bellmanFord.js');
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
let graph;
let data;
csv({ delimiter: ';' })
  .fromFile('./data/flights.CSV')
  .then((flights) => {
    // Insert CSV data into a graph
    const g = new Graph(true);

    let vertexes = {};
    let edges = {};

    // Used to find the non optimal prices
    data = flights;

    // Add graph nodes
    flights.forEach((flight) => {
      // If there is not a vertex from this origin, create one
      if (!vertexes[flight.origin]) {
        vertexes[flight.origin] = new GraphVertex(flight.origin);
      }
      // If there is not a vertex from this destination, create one
      if (!vertexes[flight.destination]) {
        vertexes[flight.destination] = new GraphVertex(flight.destination);
      }

      // If there is not a edge for this flight, create one
      if (!edges[`${ flight.origin }/${ flight.destination }`]) {
        const edge = new GraphEdge(vertexes[flight.origin], vertexes[flight.destination], parseFloat(flight.price));
        edges[`${ flight.origin }/${ flight.destination }`] = edge;
        // Insert the edge for this flight
        g.addEdge(edge);
      }
    });

    graph = g;
  });

// Create Express App
const app = express();
const port = 5000;

// Apply plugins
app.use(bodyParser.json())
app.use(cors());

/**
 * Query endpoint to search for a airport by name
 * @param {string} term
 */
app.get('/query', (req, res) => {
  const term = req.query.term.toSearch();

  const query = Object
    .entries(airports)
    .map(([code, name]) => ({ code, name }))
    .filter(({ name }) => name.toLowerCase().search(term) > -1)

  return res.send(query);
});

const trip = (origin, destination) => {
  const startVertex = new GraphVertex(origin);
  const endVertex = new GraphVertex(destination);

  const item = bellmanFord(graph, startVertex);
  const price = item.distances[destination].toFixed(2);
  const path = graph.getPath(startVertex, endVertex, item.previousVertices);
  
  return {
    price,
    path
  };
}

/**
 * Search for a trip by origin and destination
 * @param {string} origin
 * @param {string} destination
 * @param {boolean} ow
 */
app.get('/search', async(req, res) => {
  const ow = req.query.ow;
  const origin = req.query.origin;
  const destination = req.query.destination;

  let result = {};

  result.going = trip(origin, destination);

  // If it's a round trip
  if (!ow) {
    result.back = trip(destination, origin);
  }
  
  return res.send(result);
});

// Start the Express App
app.listen(port, () => console.log(`Server listening on port ${port}!`));
