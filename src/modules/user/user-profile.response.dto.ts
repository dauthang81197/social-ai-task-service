import { UserEntity } from './user.entity';
export class UserProfileResponseDto {
  id: number;
  email: string;
  username: string;
  createdDate: Date;
  updatedDate: Date;

  static fromUser(user: UserEntity | null): UserProfileResponseDto {
    const { id, email, username, createdAt, updatedAt } = user;
    return {
      id,
      email,
      username,
      createdDate: createdAt,
      updatedDate: updatedAt,
    };
  }
}
