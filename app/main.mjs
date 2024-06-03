// this is the main driver of the program
import { graph } from "./data.mjs";
import { hillClimbing } from "./hill_climbing.mjs";
import { geneticAlgorithm } from "./genetic.mjs";
import { simulatedAnnealing } from "./simulated_annealing.mjs";
//cost function to calculate the cost of a seating arrangement, it takes the arrangement as an array of person names
export function calculateArrangementCost(arrangement) {
  let totalCost = 0;
  //skip last person to do it outside with the first one
  for (let i = 0; i < arrangement.length - 1; i++) {
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

//Fisher–Yates shuffle algorithm
export function shuffle(array) {
  let currentIndex = array.length;

  //while there remain elements to shuffle...
  while (currentIndex != 0) {
    //pick a remaining element...
    let randomIndex = Math.trunc(Math.random() * currentIndex);
    currentIndex--;

    //and swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const GAResult = geneticAlgorithm(100, 1000, 0.1);
console.log("Genetic Algorithm:");
console.log("Best seating arrangement:", GAResult.bestArrangement);
console.log("Total cost:", GAResult.bestCost.toFixed(2));

console.log();

const SAResult = simulatedAnnealing(1000, 0.99, 10000);
console.log("Simulated Annealing:");
console.log("Best seating arrangement:", SAResult.bestArrangement);
console.log("Total cost:", SAResult.bestCost.toFixed(2));

console.log();

const HCResult = hillClimbing(100);
console.log("Hill Climbing:");
console.log("Best seating arrangement:", HCResult.bestArrangement);
console.log("Total cost:", HCResult.bestCost.toFixed(2));
