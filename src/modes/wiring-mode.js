class WiringMode {
  constructor() {
    this.color = Settings.components.wires.colors[0];
    this.points = [];
  }

  mouseReleased(event) {
    const point = new Position(event.offsetX, event.offsetY);
    this.points.push(point);
  }

  keyReleased(event) {
    switch (event.key) {
      case 'Enter':
        let previousNode = null;

        for (const point of this.points) {
          const currentNode = CircuitNode.get(point);

          if (previousNode === null) {
            previousNode = currentNode;
            continue;
          }

          new Wire(previousNode, currentNode, this.color);

          previousNode = currentNode;
        }

        this.points = [];
        break;
      case 'Backspace':
        this.points.pop();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
        this.color = Settings.components.wires.colors[parseInt(event.key) - 1];
        break;
      default:
        break;
    }
  }
}
