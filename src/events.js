class EventHandler {
  static DEFAULT_MODE = new DefaultMode();

  static mode = null;

  static setMode(mode) {
    this.mode = mode;
  }

  static handle(name, event) {
    const modes = [this.DEFAULT_MODE];

    if (this.mode !== null) {
      modes.push(this.mode);
    }

    modes.forEach((mode) => this.call(mode, name, event));
  }

  static call(mode, name, event) {
    Logger.write(`Calling ${mode.constructor.name}.${name}...`);

    if (typeof mode[name] === 'function') {
      mode[name](event);
    } else {
      Logger.write(
        `Method ${mode.constructor.name}.${name} does not exists!`,
        Logger.LEVEL_WARNING,
      );
    }
  }
}

function handleEvent(event) {
  EventHandler.handle(handleEvent.caller?.name ?? 'unknown', event);
}

function mouseMoved(event) {
  handleEvent(event);
}

function mouseDragged(event) {
  handleEvent(event);
}

function mousePressed(event) {
  handleEvent(event);
}

function mouseReleased(event) {
  handleEvent(event);
}

function mouseClicked(event) {
  handleEvent(event);
}

function doubleClicked(event) {
  handleEvent(event);
}

function mouseWheel(event) {
  handleEvent(event);
}

function keyReleased(event) {
  handleEvent(event);
}

function keyPressed(event) {
  handleEvent(event);
}
