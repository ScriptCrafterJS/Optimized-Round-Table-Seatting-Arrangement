import { graph } from "./data.mjs";

//cost function to calculate the cost of a seating arrangement, it takes the arrangement as an array of person names
function calculateArrangementCost(arrangement) {
  let totalCost = 0;
  for (let i = 0; i < arrangement.length - 1; i++) {
    //skip last person to do it outside with the first one
    const person1 = arrangement[i];
    const person2 = arrangement[i + 1];

    totalCost +=
      graph.get(person1).rest.get(person2) +
      graph.get(person2).rest.get(person1);
  }
  //add the cost of last and first
  const person1 = arrangement[arrangement.length - 1];
  const person2 = arrangement[0];
  totalCost +=
    graph.get(person1).rest.get(person2) + graph.get(person2).rest.get(person1);

  return totalCost;
}

//generate all possible random neighbor arrangements out of single arrangement, so hill climbing can move around and see which is the best neighbor (lower arrangement cost)
function generateNeighbors(arrangement) {
  const neighbors = []; //array of arrays, each inner array is an arrangement
  for (let i = 0; i < arrangement.length; i++) {
    for (let j = i + 1; j < arrangement.length; j++) {
      const neighbor = [...arrangement]; //copy the original arrangement
      [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
    }
  }
  return neighbors;
}
