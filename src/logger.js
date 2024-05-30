class Logger {
  static LEVEL_INFO = 'info';
  static LEVEL_WARNING = 'warning';
  static LEVEL_ERROR = 'error';

  static LEVELS = {
    [this.LEVEL_INFO]: [this.LEVEL_INFO, this.LEVEL_WARNING, this.LEVEL_ERROR],
    [this.LEVEL_WARNING]: [this.LEVEL_WARNING, this.LEVEL_ERROR],
    [this.LEVEL_ERROR]: [this.LEVEL_ERROR],
  };

  static write(text, level = this.LEVEL_INFO) {
    if (
      !Settings.logger.enabled ||
      !this.LEVELS[Settings.logger.level].includes(level)
    ) {
      return;
    }

    switch (level) {
      case this.LEVEL_INFO:
        console.info(text);
        break;
      case this.LEVEL_WARNING:
        console.warn(text);
        break;
      case this.LEVEL_ERROR:
        console.error(text);
        break;
      default:
        this.write(`Invalid log level: ${level}`, this.LEVEL_WARNING);
        break;
    }
  }

  static info(text) {
    this.write(text, this.LEVEL_INFO);
  }

  static warn(text) {
    this.write(text, this.LEVEL_WARNING);
  }

  static error(text) {
    this.write(text, this.LEVEL_ERROR);
  }
}
