const fs = require('fs');
const { promisify } = require('util');
const BaseStorage = require('./base-storage');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

class LocalStorage extends BaseStorage {
  readFile(fileName) {
    return readFile(this.buildFilePath(fileName));
  }

  readFileText(fileName) {
    return readFile(this.buildFilePath(fileName), 'utf-8');
  }

  async readFileJson(fileName) {
    const content = await this.readFileText(fileName);
    return JSON.parse(content);
  }

  writeFile(fileName, data, options) {
    return writeFile(this.buildFilePath(fileName), data, options);
  }

  writeFileText(fileName, text) {
    return this.writeFile(fileName, text, 'utf-8');
  }

  writeFileJson(fileName, json) {
    return this.writeFile(fileName, JSON.stringify(json, null, 2), 'utf-8');
  }

  deleteFile(fileName) {
    return unlink(this.buildFilePath(fileName));
  }
}

// public async deleteFile(path: string): Promise<void> {
//   await remove(this.basePath + path);
// }

module.exports = LocalStorage;
