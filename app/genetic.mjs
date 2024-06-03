import { graph, names } from "./data.mjs";
import { calculateArrangementCost, shuffle } from "./main.mjs";

function generateRandomArrangement() {
  let currentArrangement = [];
  for (let i = 0; i < 10; i++) {
    currentArrangement.push(names[i]);
  }
  shuffle(currentArrangement);
  return currentArrangement;
}

//get randomized individuals
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
  let point1 = Math.floor(Math.random() * size); //from 0 - 9
  let point2 = Math.floor(Math.random() * size); //from 0 - 9

  //ensure point2 is different from point1 so we can perform cross at different points
  while (point2 === point1) {
    point2 = Math.floor(Math.random() * size); //to pic different point to cross
  }

  //just to make the cross points in order to ensure just in case.
  if (point1 > point2) {
    [point1, point2] = [point2, point1]; //swapping the points
  }

  const child1 = Array(size).fill(-1);
  const child2 = Array(size).fill(-1);

  //copy segments from parents to children
  for (let i = point1; i <= point2; i++) {
    child1[i] = parent1[i];
    child2[i] = parent2[i];
  }

  //fill remaining positions for child1 from parent1
  for (let i = 0; i < size; i++) {
    if (child1[i] === -1) {
      child1[i] = parent1[i];
    }
  }

  //fill remaining positions for child2 from parent2
  for (let i = 0; i < size; i++) {
    if (child2[i] === -1) {
      child2[i] = parent2[i];
    }
  }
  return [child1, child2];
}

//mutation rate of 10%
function mutate(arrangement, mutationRate) {
  const size = arrangement.length; //in our case it's 10
  for (let i = 0; i < size; i++) {
    //for each single item in the arrangement it has 10% chance of being mutated
    //the random is from 0 - 1
    if (Math.random() <= mutationRate) {
      const j = Math.floor(Math.random() * size); //in our case index from 0 - 9
      [arrangement[i], arrangement[j]] = [arrangement[j], arrangement[i]];
    }
  }
  return arrangement;
}

//genetic algorithm
export function geneticAlgorithm(
  populationSize = 100,
  numGenerations = 1000,
  mutationRate = 0.1
) {
  let population = createPopulation(populationSize);

  for (let generation = 0; generation < numGenerations; generation++) {
    //here we calculate the cost of each individual in the population
    const costs = population.map((arrangement) =>
      calculateArrangementCost(arrangement).toFixed(2)
    );
    const selected = select(population, costs, 0.6); //we get the elite individuals out of the population

    const newPopulation = [];
    while (newPopulation.length < populationSize) {
      //random individuals from the elites
      const parent1 = selected[Math.floor(Math.random() * selected.length)];
      const parent2 = selected[Math.floor(Math.random() * selected.length)];

      let [child1, child2] = multiCrossover(parent1, parent2);
      child1 = mutate(child1, mutationRate);
      child2 = mutate(child2, mutationRate);
      newPopulation.push(child1);
      if (newPopulation.length < populationSize) {
        newPopulation.push(child2);
      }
    }

    population = newPopulation;
  }

  const costs = population.map((arrangement) =>
    calculateArrangementCost(arrangement)
  );
  const bestIndex = costs.indexOf(Math.min(...costs)); //get the index of the minimum cost out of this population
  return { bestArrangement: population[bestIndex], bestCost: costs[bestIndex] };
}
