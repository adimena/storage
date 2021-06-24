const path = require('path');

class BaseStorage {
  constructor(settings = {}) {
    this.settings = settings;
    this.basePath = this.settings.basePath || './';
  }

  buildFilePath(fileName) {
    return path.join(this.basePath, fileName);
  }
}

module.exports = BaseStorage;
