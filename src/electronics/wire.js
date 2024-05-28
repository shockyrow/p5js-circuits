class Wire {
  constructor(vertices, active = false) {
    this.vertices = vertices;
    this.active = active;
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
  }

  front() {
    return this.vertices[0];
  }

  end() {
    return this.vertices[this.vertices.length - 1];
  }

  ends() {
    return [this.front(), this.end()];
  }

  wires() {
    return [this];
  }

  draw() {
    push();

    if (this.active) {
      stroke(Style.getActiveColor());
    } else {
      stroke(Style.getWireColor());
    }

    beginShape(STROKE);

    for (const { x, y } of this.vertices) {
      vertex(x, y);
    }

    endShape();

    for (const { x, y } of this.ends()) {
      point(x, y);
    }

    pop();
  }
}
