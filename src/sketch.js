function setup() {
  createCanvas(
    windowWidth - Settings.canvas.margin * 2,
    windowHeight - Settings.canvas.margin * 2,
  );

  noFill();

  const battery = new Battery(new Position(100, 100));
}

function draw() {
  Artist.draw();
}
