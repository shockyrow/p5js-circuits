class Settings {
  static logger = {
    enabled: true,
    level: 'error',
  };

  static canvas = {
    margin: 16,
    background: 24,
    foreground: 220,
    cursor: {
      size: 8,
      color: 72,
    },
  };

  static grid = {
    gap: 24,
    color: 84,
    cursor: {
      color: 128,
      radius: 8,
    },
  };

  static components = {
    active: {
      color: '#FFD700',
    },
    node: {
      color: 'white',
      weight: 8,
    },
    battery: {
      color: 'white',
    },
    wires: {
      planning: {
        weight: 1,
        dash: [5],
      },
      colors: ['red', 'slateblue', 'gray', 'green'],
      weight: 4,
    },
  };
}
