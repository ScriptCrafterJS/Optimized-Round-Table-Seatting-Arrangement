import { graph, names } from "./data.mjs";
import { calculateArrangementCost, shuffle } from "./main.mjs";

function generateRandomArrangement() {
  let currentArrangement = [];
  for (let i = 0; i < 10; i++) {
    currentArrangement.push(names[i]);
  }
  shuffle(currentArrangement);
}

//get randomized indivisual
function createPopulation(populationSize) {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(generateRandomArrangement());
  }
  //here will return an array holding 100 individual [["Ahmed",..],["Khalid",...],...]
  return population;
}

//selects the top 60% of the population based on their costs
function select(population, costs, elitismRate) {
  const sortedIndices = costs
    .map((cost, index) => ({ cost, index })) //look at the element as an object
    .sort((a, b) => a.cost - b.cost) // sort the elements based on their costs
    .map((item) => item.index); //array of individuals indexes sorted based on individual cost

  const numSelected = Math.floor(elitismRate * population.length);
  return sortedIndices.slice(0, numSelected).map((index) => population[index]); //here we bring over the elite individuals from the population
}
