"use strict";
import { Node } from "./Node.mjs";
const names = [
  "Ahmed",
  "Salem",
  "Ayman",
  "Hani",
  "Kamal",
  "Samir",
  "Hakam",
  "Fuad",
  "Ibrahim",
  "Khalid",
];
const heuristics = [
  {
    name: "Ahmed",
    neighbors: [0, 0.68, 0.55, 0.3, 0.82, 0.48, 0.33, 0.1, 0.76, 0.43],
  },
  {
    name: "Salem",
    neighbors: [0.68, 0, 0.9, 0.11, 0.76, 0.2, 0.55, 0.17, 0.62, 0.99],
  },
  {
    name: "Ayman",
    neighbors: [0.55, 0.9, 0, 0.7, 0.63, 0.96, 0.51, 0.9, 0.88, 0.64],
  },
  {
    name: "Hani",
    neighbors: [0.3, 0.11, 0.7, 0.0, 0.91, 0.86, 0.78, 0.99, 0.53, 0.92],
  },
  {
    name: "Kamal",
    neighbors: [0.82, 0.76, 0.63, 0.91, 0, 0.43, 0.88, 0.53, 0.42, 0.75],
  },
  {
    name: "Samir",
    neighbors: [0.48, 0.2, 0.96, 0.86, 0.43, 0, 0.63, 0.97, 0.37, 0.26],
  },
  {
    name: "Hakam",
    neighbors: [0.33, 0.55, 0.51, 0.78, 0.88, 0.63, 0, 0.92, 0.87, 0.81],
  },
  {
    name: "Fuad",
    neighbors: [0.1, 0.17, 0.9, 0.99, 0.53, 0.97, 0.92, 0, 0.81, 0.78],
  },
  {
    name: "Ibrahim",
    neighbors: [0.76, 0.62, 0.88, 0.53, 0.42, 0.37, 0.87, 0.81, 0, 0.45],
  },
  {
    name: "Khalid",
    neighbors: [0.43, 0.99, 0.64, 0.92, 0.75, 0.26, 0.81, 0.78, 0.45, 0],
  },
];

export const graph = new Map();

for (let i = 0; i < heuristics.length; i++) {
  const entry = heuristics[i];
  const neighbors = new Map();

  for (let j = 0; j < entry.neighbors.length; j++) {
    if (i !== j) {
      neighbors.set(names[j], entry.neighbors[j]);
    }
  }
  const node = new Node(entry.name, 0, null);
  graph.set(entry.name, { node: node, rest: neighbors });
}

/* 
  
  Ahmad => {
    node: {'Ahmad',0,null},
    rest: (
    Salem => 68%
    Ayman => 55%
    .
    .
    )
  }
  
  */

/*
0: Ahmad => {
    node: {'Ahmad',0,null},
    rest: (
    Salem => 68%
    Ayman => 55%
    .
    .
    )
  }
1: Salem => {
    node: {},
    rest: (
    Ahmad => 68%
    Ayman => 90%
    )
  }

*/
