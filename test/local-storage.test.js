const path = require('path');
const LocalStorage = require('../src/local-storage');

describe('Local Storage', () => {
  describe('constructor', () => {
    test('It should create a new instance', () => {
      const instance = new LocalStorage();
      expect(instance).toBeDefined();
    });
    test('Settings can be provided', () => {
      const instance = new LocalStorage({ name: 'a' });
      expect(instance.settings).toEqual({ name: 'a' });
    });
    test('Default basePath is .', () => {
      const instance = new LocalStorage();
      expect(instance.basePath).toEqual('./');
    });
    test('basePath can be provided', () => {
      const instance = new LocalStorage({ basePath: './documents/' });
      expect(instance.basePath).toEqual('./documents/');
    });
  });

  describe('buildFilePath', () => {
    test('It should create a full file path', () => {
      const instance = new LocalStorage({ basePath: './documents/' });
      const filePath = '/input/file1.pdf';
      const actual = instance.buildFilePath(filePath);
      const expected = path.join('./documents/', '/input/file1.pdf');
      expect(actual).toEqual(expected);
    });
  });

  describe('readFile', () => {
    test('It should read a file', async () => {
      const instance = new LocalStorage({ basePath: './test' });
      const content = await instance.readFile('testfile.txt');
      const expected = 'test';
      expect(content.toString()).toEqual(expected);
    });
  });

  describe('readFileText', () => {
    test('It should read a text file', async () => {
      const instance = new LocalStorage({ basePath: './test' });
      const content = await instance.readFileText('testfile.txt');
      const expected = 'test';
      expect(content).toEqual(expected);
    });
  });

  describe('readFileJson', () => {
    test('It should read a json file', async () => {
      const instance = new LocalStorage({ basePath: './test' });
      const content = await instance.readFileJson('testfile.json');
      const expected = { name: 'John', id: 12 };
      expect(content).toEqual(expected);
    });
  });
});
