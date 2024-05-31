function setup() {
  createCanvas(
    windowWidth - Settings.canvas.margin * 2,
    windowHeight - Settings.canvas.margin * 2,
  );

  noFill();

  const battery = new Battery(new Position(200, 100));
  const transistor = new Transistor(new Position(300, 200));
}

function draw() {
  Artist.draw();
}
