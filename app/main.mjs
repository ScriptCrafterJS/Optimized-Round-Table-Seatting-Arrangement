// this is the main driver of the program
import { graph } from "./data.mjs";
import { hillClimbing } from "./hill_climbing.mjs";
import { geneticAlgorithm } from "./genetic.mjs";
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

//randomize an array method
export function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

console.log("Hill Climbing:");
const HCResult = hillClimbing(100);
console.log("Best arrangement:", HCResult.bestArrangement);
console.log("Best cost:", HCResult.bestCost.toFixed(2));

console.log();

const GAResult = geneticAlgorithm(100, 1000, 0.1);
console.log("Genetic Algorithm:");
console.log("Best arrangement:", GAResult.bestArrangement);
console.log("Best cost:", GAResult.bestCost.toFixed(2));
