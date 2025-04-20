import { ExecutionContext, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as _ from 'lodash';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

import { AppModule } from '../../src/app.module';
import { RoleType } from '../../src/common/constants/enum';
import { JwtAuthGuard } from '../../src/guards';
import { UsersRepository } from '../../src/modules/users/users.repository';
import { JWT_PAYLOAD_ADMIN } from '../const';
import { setupLocalDataSource } from '../setup_test_datasrouce';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let repository: UsersRepository;

  let module: TestingModule;

  beforeAll(async () => {
    // Get PG in memory DB connection
    const dataSource = await setupLocalDataSource();

    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = JWT_PAYLOAD_ADMIN;
          return true;
        },
      })
      .compile();
    app = await module.createNestApplication().init();
    repository = module.get(getRepositoryToken(UsersRepository));
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('Should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('POST /users', () => {
    const user = {
      firstName: 'Jame',
      lastName: 'Mathias',
      role: RoleType.USER,
      email: 'jame.mathias@gmail.com',
      password: 'password',
    };

    it('should create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(user);
      expect(response.status).toEqual(HttpStatus.CREATED);
      expect(
        _.pick(response.body.data, ['firstName', 'lastName', 'role', 'email']),
      ).toEqual(_.omit(user, ['password']));
    });

    it('should return 400 if email already exists', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(user);
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
