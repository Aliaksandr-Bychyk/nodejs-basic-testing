import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  const account = getBankAccount(300);
  const secondAccount = getBankAccount(400);
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(400)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(400, secondAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(400, account)).toThrow();
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(350);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(300);
  });

  test('should transfer money', () => {
    account.transfer(50, secondAccount);
    expect(account.getBalance()).toBe(250);
    expect(secondAccount.getBalance()).toBe(450);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mock = jest.spyOn(_, 'random').mockReturnValue(1);
    const balance = await account.fetchBalance();
    expect(balance).toBe(1);
    mock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mock = jest.spyOn(_, 'random').mockReturnValue(1);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1);
    mock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mock = jest.spyOn(_, 'random').mockReturnValue(0);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    mock.mockRestore();
  });
});
