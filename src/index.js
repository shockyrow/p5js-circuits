const SKETCH_MARGIN = 32;

const electronics = [];

let nearby = null;
let wire = null;
let activated = [];
let mode = 'pointer';

const modes = {
  pointer: {
    keyReleased() {},
    mouseReleased() {
      for (const electronic of electronics) {
        if (
          electronic instanceof Switch &&
          dist(mouseX, mouseY, electronic.position.x, electronic.position.y) <
            20
        ) {
          electronic.switch();
        }
      }
    },
  },
  wire: {
    keyReleased() {
      switch (key) {
        case 'Enter':
          if (wire !== null && wire.vertices.length > 1) {
            addElectronic(wire);
          }

          wire = null;
          break;
        case 'Escape':
          wire = null;
          break;
        default:
          break;
      }
    },
    mouseReleased() {
      if (wire === null) {
        wire = new Wire([]);
      }

      if (nearby) {
        wire.addVertex(nearby);

        if (wire.vertices.length > 1) {
          addElectronic(wire);
          wire = null;
        }
      } else {
        wire.addVertex(new Vertex(mouseX, mouseY));
      }
    },
  },
  battery: {
    keyReleased() {},
    mouseReleased() {
      electronics.push(new Battery(new Vertex(mouseX, mouseY)));
    },
  },
  transistor: {
    keyReleased() {},
    mouseReleased() {
      electronics.push(new Transistor(new Vertex(mouseX, mouseY)));
    },
  },
  switch: {
    keyReleased() {},
    mouseReleased() {
      electronics.push(new Switch(new Vertex(mouseX, mouseY)));
    },
  },
};

function updateWiring() {
  for (const electronic of electronics) {
    for (const wire of electronic.wires()) {
      wire.active = false;
    }
  }

  activated = [];

  for (const electronic of electronics) {
    if (electronic instanceof Battery) {
      electronic.output.active = true;
      activate(electronic.output.end());
    }
  }

  for (const electronic of electronics) {
    if (electronic instanceof Transistor && electronic.base.active) {
      electronic.output.active = electronic.input.active;

      if (electronic.output.active) {
        activate(electronic.output.end());
      }
    }
  }
}

function addElectronic(electronic) {
  electronics.push(electronic);

  updateWiring();
}

function activate(vertex) {
  if (activated.includes(vertex.serialize())) {
    return;
  }

  activated.push(vertex.serialize());

  for (const electronic of electronics) {
    for (const wire of electronic.wires()) {
      for (const end of wire.ends()) {
        if (vertex.equals(end)) {
          wire.active = true;

          for (const next of wire.ends()) {
            activate(next);
          }
        }
      }
    }
  }
}

function keyReleased() {
  modes[mode].keyReleased();

  switch (key) {
    case 'Escape':
      mode = 'pointer';
      break;
    case '1':
      mode = 'wire';
      break;
    case '2':
      mode = 'battery';
      break;
    case '3':
      mode = 'transistor';
      break;
    case '4':
      mode = 'switch';
      break;
    default:
      break;
  }

  wire = null;

  updateWiring();
}

function mouseReleased() {
  modes[mode].mouseReleased();
  updateWiring();
}

function setup() {
  createCanvas(
    windowWidth - SKETCH_MARGIN * 2,
    windowHeight - SKETCH_MARGIN * 2,
  );

  noFill();
}

function draw() {
  background(Style.getBackgroundColor());

  stroke('black');
  text(mode, 10, 20);

  nearby = null;
  otherWire = null;

  for (const electronic of electronics) {
    electronic.draw();

    for (const end of electronic.ends()) {
      if (
        dist(end.x, end.y, mouseX, mouseY) < 10 &&
        (nearby === null || dist(end.x, end.y, nearby.x, nearby.y))
      ) {
        nearby = end;
      }
    }
  }

  push();

  if (nearby) {
    stroke(Style.getHighlightColor());
    strokeWeight(6);
    point(nearby.x, nearby.y);
  }

  if (wire) {
    const end = wire.end();
    wire.draw();
    strokeWeight(1);
    drawingContext.setLineDash([5]);
    line(end.x, end.y, mouseX, mouseY);
  }

  pop();
}
