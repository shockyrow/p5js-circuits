function rewire() {
  for (const node of Object.values(Electronics.nodes)) {
    node.active = false;
  }

  for (const battery of Object.values(Electronics.batteries)) {
    battery.output.active = true;
  }
}
