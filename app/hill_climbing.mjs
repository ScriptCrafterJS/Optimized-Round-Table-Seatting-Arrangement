import { names } from "./data.mjs";
import { calculateArrangementCost, shuffle } from "./main.mjs";

//generate all possible random neighbor arrangements out of single arrangement, so hill climbing can move around and see which is the best neighbor (lower arrangement cost)
function generateNeighbors(arrangement) {
  const neighbors = []; //array of arrays, each inner array is an arrangement
  for (let i = 0; i < arrangement.length; i++) {
    for (let j = i + 1; j < arrangement.length; j++) {
      const neighbor = [...arrangement]; //copy the original arrangement
      [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
    }
  }
  return neighbors; //array of randomly generated seating arrangements
}

export function hillClimbing(numRestarts = 100) {
  let bestArrangement = null;
  let bestCost = Number.POSITIVE_INFINITY;

  //here to make multiple restarts, it helps avoid local minima
  for (let r = 0; r < numRestarts; r++) {
    //initial random arrangement
    let currentArrangement = [];
    for (let i = 0; i < 10; i++) {
      currentArrangement.push(names[i]);
    }
    shuffle(currentArrangement);
    let currentCost = calculateArrangementCost(currentArrangement);
    let improving = true;

    while (improving) {
      //what is the best cost out of all neighbors
      const neighbors = generateNeighbors(currentArrangement);
      let bestNeighborCost = Infinity;
      let bestNeighbor = null;

      for (const neighbor of neighbors) {
        //traversing the neighbors to see which has the best cost
        const cost = calculateArrangementCost(neighbor);
        if (cost < bestNeighborCost) {
          bestNeighborCost = cost;
          bestNeighbor = neighbor;
        }
      }

      if (bestNeighborCost < currentCost) {
        currentArrangement = bestNeighbor; //this is better neighbor arrangement from the previous arrangement
        currentCost = bestNeighborCost;
      } else {
        improving = false;
      }
    }

    if (currentCost < bestCost) {
      //you may find a better cost out of a different stat k better than a whole solution in another area (best solution in area A , ive found a neighbor in area B which is better than the best solution in area A)
      bestArrangement = currentArrangement;
      bestCost = currentCost;
    }
  }

  return { bestArrangement, bestCost };
}
