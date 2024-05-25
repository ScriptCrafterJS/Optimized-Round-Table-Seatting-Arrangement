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
