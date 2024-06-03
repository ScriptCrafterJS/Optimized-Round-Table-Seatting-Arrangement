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

function multiCrossover(parent1, parent2) {
  //both of those parents are individuals e.g. ["Ahmed",...]
  const size = parent1.length; //for our case its 10
  const point1 = Math.floor(Math.random() * size); //from 0 - 9
  let point2 = Math.floor(Math.random() * size); //from 0 - 9

  //ensure point2 is different from point1 so we can perform cross at different points
  while (point2 === point1) {
    point2 = Math.floor(Math.random() * size); //to pic different point to cross
  }

  //just to make the cross points in order to ensure just in case.
  if (point1 > point2) {
    [point1, point2] = [point2, point1]; //swapping the points
  }

  //create children by slicing and swapping segments
  const child1 = [
    ...parent1.slice(0, point1),
    ...parent2.slice(point1, point2),
    ...parent1.slice(point2),
  ];

  const child2 = [
    ...parent2.slice(0, point1),
    ...parent1.slice(point1, point2),
    ...parent2.slice(point2),
  ];

  return [child1, child2];
}
