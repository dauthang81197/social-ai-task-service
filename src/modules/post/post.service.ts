import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SortEnum } from 'src/common';
import { PaginationResult } from 'src/interfaces';
import { PostResponseDto } from 'src/modules/post/dtos/post.response';
import { QueryPostDto } from 'src/modules/post/dtos/query-post.dto';
import { PostEntity } from 'src/modules/post/post.entity';
import { PostRepository } from 'src/modules/post/post.repository';
import { UserEntity } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  private readonly logger = new Logger(PostService.name);

  async list(
    query: QueryPostDto,
    userLogin: UserEntity,
  ): Promise<PaginationResult<PostEntity>> {
    console.log(userLogin);
    this.logger.log('Function get list post start !!!');
    const { limit, page } = query;

    const qb = await this.qbGetList(query);
    const result = await this.postRepository.list({
      limit: limit,
      page: page,
      queryBuilder: qb,
    });
    result.data = result.data.map((item) => {
      return plainToInstance(PostResponseDto, item);
    });
    return result;
  }

  async addPost(post: PostEntity) {
    const users = await this.userRepository.find();
    const randomIndex = Math.floor(Math.random() * users.length);

    await this.postRepository.save({
      content: post?.content,
      user: {
        id: users[randomIndex]?.id,
      },
      comments: [],
      imageUrl: post?.imageUrl,
      status: 1,
    });
  }
  private async qbGetList(
    query: QueryPostDto,
  ): Promise<SelectQueryBuilder<PostEntity>> {
    const { searchKey, sortBy } = query;
    const qb = this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.id',
        'p.content',
        'p.imageUrl',
        'p.createdAt',
        'p.updatedAt',
        'p.status',
        'u.id',
        'u.username',
        'u.avatarUrl',
      ]);
    qb.leftJoin('p.user', 'u');

    const upperCaseSearchKey = searchKey.toUpperCase();
    if (searchKey) {
      qb.where('(UPPER(p.content) LIKE :content)', {
        content: `%${upperCaseSearchKey}%`,
      });
    }
    if (sortBy === SortEnum.ASC) {
      qb.orderBy('p.createdAt', SortEnum.ASC);
    } else {
      qb.orderBy('p.createdAt', SortEnum.DESC);
    }
    return qb;
  }
}
