class DefaultMode {
  constructor() {}

  keyReleased(event) {
    if (event.key === 'Escape') {
      EventHandler.setMode(null);
    }

    if (EventHandler.mode) {
      return;
    }

    switch (event.key) {
      case '1':
        EventHandler.setMode(new WiringMode());
        break;
      default:
        Logger.error(event);
        break;
    }
  }
}
