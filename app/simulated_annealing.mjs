import { names } from "./data.mjs";
import { calculateArrangementCost, shuffle } from "./main.mjs";

// Generate a random neighbor by swapping two random elements
function getRandomNeighbor(arrangement) {
  const neighbor = [...arrangement]; //take copy out of the arrangement
  const i = Math.trunc(Math.random() * 10); //random from 0 - 9
  const j = Math.trunc(Math.random() * 10);
  [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]]; //swap two elements in the arrangement
  return neighbor;
}

//cooling function to decrease temperature
function schedule(initialTemperature, coolingRate, t) {
  return initialTemperature * Math.pow(coolingRate, t);
}

export function simulatedAnnealing(
  initialTemperature,
  coolingRate,
  numIterations
) {
  const size = 10;
  //initial solution randomly shuffle the arrangement
  let currentArrangement = [];
  for (let i = 0; i < 10; i++) {
    currentArrangement.push(names[i]);
  }
  shuffle(currentArrangement);
  let currentCost = calculateArrangementCost(currentArrangement);

  //track the best solution found so far (means if we finished before finding the best solution at least we got the current best solution)
  let bestArrangement = [...currentArrangement];
  let bestCost = currentCost;

  //simulated Annealing process
  for (let t = 0; t < numIterations; t++) {
    const temperature = schedule(initialTemperature, coolingRate, t); //the cooling is based on the iteration number more iteration more cooling less worse acceptance
    if (temperature === 0) break;

    //instead of picking the best move, a random move is picked
    const neighbor = getRandomNeighbor(currentArrangement);
    const neighborCost = calculateArrangementCost(neighbor);

    const deltaE = currentCost - neighborCost;

    //if theres an improvement in the next move
    if (deltaE > 0) {
      //here we accept the next move directly
      currentArrangement = neighbor;
      currentCost = neighborCost;

      //keep track of the best solution so far
      if (currentCost < bestCost) {
        bestArrangement = [...currentArrangement];
        bestCost = currentCost;
      }
      //if theres no improvement look at the acceptance rate of it.
    } else if (Math.random() < Math.exp(deltaE / temperature)) {
      currentArrangement = neighbor;
      currentCost = neighborCost;

      if (currentCost < bestCost) {
        bestArrangement = [...currentArrangement];
        bestCost = currentCost;
      }
    }
  }
  return { bestArrangement, bestCost };
}
