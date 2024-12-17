export class UsernameSalaryExistsError extends Error {
  constructor() {
    super('username already has a salary');
  }
}
