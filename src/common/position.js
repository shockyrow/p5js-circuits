class Position {
  constructor(x, y) {
    this.x = Math.round(x / Settings.grid.gap) * Settings.grid.gap;
    this.y = Math.round(y / Settings.grid.gap) * Settings.grid.gap;
  }

  up() {
    return new Position(this.x, this.y - Settings.grid.gap);
  }

  down() {
    return new Position(this.x, this.y + Settings.grid.gap);
  }

  right() {
    return new Position(this.x + Settings.grid.gap, this.y);
  }

  left() {
    return new Position(this.x - Settings.grid.gap, this.y);
  }

  getKey() {
    return `${this.x}x${this.y}`;
  }
}
