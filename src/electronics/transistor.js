class Transistor {
  constructor(position) {
    this.position = position;

    this.input = new Wire([
      new Vertex(this.position.x - 3, this.position.y + 5),
      new Vertex(this.position.x - 5, this.position.y),
      new Vertex(this.position.x - 15, this.position.y),
    ]);

    this.base = new Wire([
      new Vertex(this.position.x, this.position.y + 5),
      new Vertex(this.position.x, this.position.y + 15),
    ]);

    this.output = new Wire([
      new Vertex(this.position.x + 3, this.position.y + 5),
      new Vertex(this.position.x + 5, this.position.y),
      new Vertex(this.position.x + 15, this.position.y),
    ]);
  }

  ends() {
    return [this.input.end(), this.base.end(), this.output.end()];
  }

  wires() {
    return [this.input, this.base, this.output];
  }

  draw() {
    this.input.draw();
    this.base.draw();
    this.output.draw();

    push();

    stroke(Style.getForegroundColor());

    for (const { x, y } of this.ends()) {
      point(x, y);
    }

    strokeWeight(1);

    if (this.base.active) {
      stroke(Style.getActiveColor());
    } else {
      stroke(Style.getForegroundColor());
    }

    circle(this.position.x, this.position.y, 20);

    line(
      this.position.x - 5,
      this.position.y + 5,
      this.position.x + 5,
      this.position.y + 5,
    );

    pop();
  }
}
