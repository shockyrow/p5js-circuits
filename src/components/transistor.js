class Transistor {
  constructor(position) {
    this.position = position;
    this.input = CircuitNode.get(this.position.left());
    this.output = CircuitNode.get(this.position.right());
    this.base = CircuitNode.get(this.position.down());

    Electronics.transistors[position.getKey()] = this;
  }
}
