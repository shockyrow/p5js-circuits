class CircuitNode {
  constructor(position, active = false) {
    this.position = position;
    this.active = active;

    Electronics.nodes[position.getKey()] = this;
  }

  static get(position) {
    return Electronics.nodes[position.getKey()] ?? new CircuitNode(position);
  }
}
