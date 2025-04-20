import { InjectRepository } from '@nestjs/typeorm';
import { TypeORMRepository } from 'src/database';
import { PostEntity } from 'src/modules/post/post.entity';
import { Repository } from 'typeorm';

export class PostRepository extends TypeORMRepository<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    repository: Repository<PostEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
