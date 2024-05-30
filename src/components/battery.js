class Battery {
  constructor(position, capacity = 5) {
    this.position = position;
    this.input = CircuitNode.get(this.position.left());
    this.output = CircuitNode.get(this.position.right());
    this.capacity = capacity;

    Electronics.batteries[position.getKey()] = this;
  }
}
