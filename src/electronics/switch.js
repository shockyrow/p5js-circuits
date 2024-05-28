class Switch {
  constructor(position) {
    this.position = position;
    this.active = false;

    this.input = new Wire([
      new Vertex(this.position.x - 10, this.position.y),
      new Vertex(this.position.x - 20, this.position.y),
    ]);

    this.output = new Wire([
      new Vertex(this.position.x + 10, this.position.y),
      new Vertex(this.position.x + 20, this.position.y),
    ]);

    this.control = new Wire([
      this.output.front(),
      new Vertex(this.position.x - 6, this.position.y + 10),
    ]);
  }

  ends() {
    return [this.input.end(), this.output.end()];
  }

  wires() {
    return [this.input, this.control, this.output];
  }

  switch() {
    if (this.active) {
      this.control = new Wire([
        this.output.front(),
        new Vertex(this.position.x - 6, this.position.y + 10),
      ]);
    } else {
      this.control = new Wire([this.output.front(), this.input.front()]);
    }

    this.active ^= true;
  }

  draw() {
    this.input.draw();
    this.control.draw();
    this.output.draw();
  }
}
