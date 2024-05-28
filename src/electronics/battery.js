class Battery {
  constructor(position, power = 5) {
    this.position = position;
    this.power = power;

    this.input = new Wire([
      new Vertex(this.position.x - 2, this.position.y),
      new Vertex(this.position.x - 10, this.position.y),
    ]);

    this.output = new Wire([
      new Vertex(this.position.x + 2, this.position.y),
      new Vertex(this.position.x + 10, this.position.y),
    ]);

    this.output.active = true;
  }

  ends() {
    return [this.input.end(), this.output.end()];
  }

  wires() {
    return [this.input, this.output];
  }

  draw() {
    this.input.draw();
    this.output.draw();

    push();

    stroke(Style.getForegroundColor());

    line(
      this.input.front().x,
      this.position.y - 5,
      this.input.front().x,
      this.position.y + 5,
    );

    line(
      this.output.front().x,
      this.position.y - 10,
      this.output.front().x,
      this.position.y + 10,
    );

    pop();
  }
}
