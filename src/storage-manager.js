const LocalStorage = require('./local-storage');

class StorageManager {
  constructor(settings = {}) {
    this.settings = settings;
    this.storageTypes = {};
    this.addStorageType('local', LocalStorage);
    this.storages = {};
    if (this.settings.storages && this.settings.storages.length > 0) {
      for (let i = 0; i < this.settings.storages.length; i += 1) {
        this.addStorage(this.settings.storages[i]);
      }
    }
  }

  addStorageType(name, clazz) {
    this.storageTypes[name] = clazz;
  }

  createStorage(opts) {
    const Clazz = this.storageTypes[opts.type] || LocalStorage;
    return new Clazz(opts);
  }

  getStorage(name = 'default') {
    return this.storages[name];
  }

  addStorage(opts = {}) {
    const type = opts.type || 'local';
    const name = opts.name || 'default';
    this.storages[name] = this.createStorage({ ...opts, type, name });
    return this.storages[name];
  }

  getStorageAndFile(srcStoreName, srcFilePath) {
    const storeName = srcFilePath ? srcStoreName : 'default';
    const filePath = srcFilePath || srcStoreName;
    const storage = this.storages[storeName];
    if (!storage) {
      throw new Error(`Storage with name "${storeName}" does not exist`);
    }
    return {
      storage,
      filePath,
    };
  }

  readFile(storeName, srcPath) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.readFile(filePath);
  }

  readFileText(storeName, srcPath) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.readFileText(filePath);
  }

  readFileJson(storeName, srcPath) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.readFileJson(filePath);
  }

  writeFile(storeName, srcPath, data, options) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.writeFile(filePath, data, options);
  }

  writeFileText(storeName, srcPath, text) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.writeFileText(filePath, text);
  }

  writeFileJson(storeName, srcPath, json) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.writeFileJson(filePath, json);
  }

  deleteFile(storeName, srcPath) {
    const { storage, filePath } = this.getStorageAndFile(storeName, srcPath);
    return storage.deleteFile(filePath);
  }
}

module.exports = StorageManager;
