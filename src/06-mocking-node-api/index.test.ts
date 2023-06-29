import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const callback = jest.fn();
const timeout = 1000;
const pathToFile = 'main.txt';
const fileContent = 'RS School NodeJS 2023 Q2';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalled();
    jest.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve(fileContent));
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
