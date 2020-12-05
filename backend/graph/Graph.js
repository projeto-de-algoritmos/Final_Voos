class Graph {
  edges = {};
  nodes = [];

  addNode(node) {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
      this.edges[node] = [];
    }
  }

  addEdge(node1, node2, weight) {
    this.edges[node1].push({ node: node2, weight: weight });
  }
}

module.exports = Graph;
