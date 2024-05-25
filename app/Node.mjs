export class Node {
  constructor(personName, cost, previous) {
    this.personName = personName;
    this.cost = cost;
    this.previous = previous;
  }

  get getCost() {
    return this.cost;
  }

  get getPerson() {
    return this.personName;
  }

  get getPrevious() {
    return this.previous;
  }

  get getNeighbors() {
    return this.neighbors;
  }

  set setCost(cost) {
    this.cost = cost;
  }

  set setPerson(personName) {
    this.personName = personName;
  }

  set setPrevious(previous) {
    this.previous = previous;
  }
}
