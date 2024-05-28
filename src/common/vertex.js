class Vertex {
  constructor(x, y) {
    this.x = parseInt(x);
    this.y = parseInt(y);
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  serialize() {
    return `${this.x}x${this.y}`;
  }
}
