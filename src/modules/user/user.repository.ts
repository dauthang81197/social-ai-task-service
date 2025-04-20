import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeORMRepository } from 'src/database';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends TypeORMRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.createQueryBuilder('u')
      .where('u.email ILIKE :email', { email: `${escapeUnderscore(email)}` })
      .getOne();
  }
}

const escapeUnderscore = (email: string): string => {
  return email.replace(/_/g, '\\_');
};
