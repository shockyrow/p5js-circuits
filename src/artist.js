class Artist {
  static draw() {
    background(Settings.canvas.background);

    Artist._drawGrid();
    Artist._drawComponents();
    Artist._drawMode();
    Artist._drawCursor();
  }

  static _drawGrid() {
    push();

    stroke(Settings.grid.color);

    beginShape(POINTS);
    for (let y = 0; y < height; y += Settings.grid.gap) {
      for (let x = 0; x < width; x += Settings.grid.gap) {
        vertex(x, y);
      }
    }
    endShape();

    pop();
  }

  static _drawComponents() {
    push();

    this._drawBatteries();
    this._drawTransistors();
    this._drawWires();
    this._drawNodes();

    pop();
  }

  static _drawMode() {
    const mode = EventHandler.mode;

    if (mode instanceof WiringMode) {
      const mousePoint = new Position(mouseX, mouseY);

      push();

      stroke(mode.color);
      drawingContext.setLineDash(Settings.components.wires.planning.dash);

      beginShape(STROKE);
      for (const point of mode.points) {
        vertex(point.x, point.y);
      }
      vertex(mousePoint.x, mousePoint.y);
      endShape();

      stroke(mode.color);
      drawingContext.setLineDash(Settings.components.wires.planning.dash);

      beginShape(STROKE);
      for (const point of mode.points) {
        vertex(point.x, point.y);
      }
      vertex(mousePoint.x, mousePoint.y);
      endShape();

      pop();
    }
  }

  static _drawCursor() {
    push();

    const mousePoint = new Position(mouseX, mouseY);

    stroke(Settings.grid.cursor.color);
    circle(mousePoint.x, mousePoint.y, Settings.grid.cursor.radius);

    const halfSize = Settings.canvas.cursor.size / 2;

    stroke(Settings.canvas.cursor.color);
    line(mouseX - halfSize, mouseY, mouseX + halfSize, mouseY);
    line(mouseX, mouseY - halfSize, mouseX, mouseY + halfSize);

    pop();
  }

  static _drawBatteries() {
    strokeWeight(2);

    for (const battery of Object.values(Electronics.batteries)) {
      beginShape(LINES);
      stroke(Settings.components.battery.color);
      vertex(battery.input.position.x, battery.input.position.y);
      vertex(
        battery.input.position.x + 0.75 * Settings.grid.gap,
        battery.input.position.y,
      );
      vertex(
        battery.input.position.x + 0.75 * Settings.grid.gap,
        battery.input.position.y - 0.25 * Settings.grid.gap,
      );
      vertex(
        battery.input.position.x + 0.75 * Settings.grid.gap,
        battery.input.position.y + 0.25 * Settings.grid.gap,
      );

      stroke(Settings.components.active.color);
      vertex(
        battery.output.position.x - 0.75 * Settings.grid.gap,
        battery.output.position.y - 0.6 * Settings.grid.gap,
      );
      vertex(
        battery.output.position.x - 0.75 * Settings.grid.gap,
        battery.output.position.y + 0.6 * Settings.grid.gap,
      );
      vertex(battery.output.position.x, battery.output.position.y);
      vertex(
        battery.output.position.x - 0.75 * Settings.grid.gap,
        battery.output.position.y,
      );
      endShape();
    }
  }

  static _drawTransistors() {
    strokeWeight(2);

    for (const transistor of Object.values(Electronics.transistors)) {
      beginShape(STROKE);
      vertex(transistor.input.position.x, transistor.input.position.y);
      vertex(
        transistor.input.position.x + 0.75 * Settings.grid.gap,
        transistor.input.position.y,
      );
      vertex(
        transistor.input.position.x + 0.85 * Settings.grid.gap,
        transistor.input.position.y + 0.25 * Settings.grid.gap,
      );
      endShape();

      beginShape(STROKE);
      vertex(transistor.output.position.x, transistor.output.position.y);
      vertex(
        transistor.output.position.x - 0.75 * Settings.grid.gap,
        transistor.output.position.y,
      );
      vertex(
        transistor.output.position.x - 0.85 * Settings.grid.gap,
        transistor.output.position.y + 0.25 * Settings.grid.gap,
      );
      endShape();

      beginShape(LINES);
      vertex(transistor.base.position.x, transistor.base.position.y);
      vertex(
        transistor.base.position.x,
        transistor.base.position.y - 0.75 * Settings.grid.gap,
      );
      vertex(
        transistor.base.position.x - 0.25 * Settings.grid.gap,
        transistor.base.position.y - 0.75 * Settings.grid.gap,
      );
      vertex(
        transistor.base.position.x + 0.25 * Settings.grid.gap,
        transistor.base.position.y - 0.75 * Settings.grid.gap,
      );
      endShape();

      circle(
        transistor.position.x,
        transistor.position.y,
        Settings.grid.gap * 1.25,
      );
    }
  }

  static _drawWires() {
    strokeWeight(Settings.components.wires.weight);

    for (const wire of Electronics.wires) {
      stroke(wire.color);
      line(
        wire.front.position.x,
        wire.front.position.y,
        wire.end.position.x,
        wire.end.position.y,
      );
    }
  }

  static _drawNodes() {
    strokeWeight(Settings.components.node.weight);

    beginShape(POINTS);
    for (const node of Object.values(Electronics.nodes)) {
      if (node.active) {
        stroke(Settings.components.active.color);
      } else {
        stroke(Settings.components.node.color);
      }

      vertex(node.position.x, node.position.y);
    }
    endShape();
  }
}
