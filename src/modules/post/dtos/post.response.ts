import { Expose, Transform } from 'class-transformer';
import { PostEntity } from 'src/modules/post/post.entity';

export class PostResponseDto extends PostEntity {
  @Expose()
  @Transform(() => {
    return 1000;
  })
  countLike: number;

  @Expose()
  @Transform(() => {
    return 140;
  })
  countComment: number;

  @Expose()
  @Transform(() => {
    return 37;
  })
  countShare: number;

  @Expose()
  @Transform(({ obj }) => {
    return {
      ...obj?.user,
      verified: true,
    };
  })
  user: any;
}
