import { Salary, User } from '@prisma/client';
import { SalaryRepository } from '../repositories/salary-repository';
import { UserRepository } from '../repositories/user-repository';
import { CreateSalaryService } from './create-salary-service';
import { Decimal } from '@prisma/client/runtime/library';

describe('createSalaryService', () => {
  let salaryRepository: jest.Mocked<SalaryRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let createSalaryService: CreateSalaryService;

  beforeEach(() => {
    salaryRepository = {
      create: jest.fn(),
      findByUsername: jest.fn(),
    };
    userRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      findByUsername: jest.fn(),
    };

    createSalaryService = new CreateSalaryService(salaryRepository, userRepository);
  });

  it('should return a user salary', async () => {
    const user: User = {
      id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: 'johnDoe',
      createdAt: new Date(),
    };

    const salary: Salary = {
      id: '123',
      amount: new Decimal(3000),
      paymentDay: 10,
      username: 'johnDoe',
    };

    userRepository.findByUsername.mockResolvedValue(user);
    salaryRepository.create.mockResolvedValue(salary);

    const result = await createSalaryService.execute(salary);

    expect(result.salary).toEqual(salary);

    expect(salaryRepository.create).toHaveBeenCalledWith({
      amount: salary.amount,
      paymentDay: salary.paymentDay,
      username: salary.username,
    });
  });
});
