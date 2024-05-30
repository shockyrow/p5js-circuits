class Wire {
  constructor(front, end, color = Settings.components.wires.colors[0]) {
    this.front = front;
    this.end = end;
    this.color = color;

    Electronics.wires.push(this);
  }
}
