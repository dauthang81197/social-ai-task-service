// yarn seed:run -n src/database/seeds/user.seeder.ts
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { PermissionEntity } from '../../modules/permissions/permissions.entity';
import { RolesEntity } from '../../modules/roles/roles.entity';
import { UserEntity } from '../../modules/user/user.entity';

export default class OrganizationUserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    // ---------------------------------------------------
    await this._saveUser(dataSource);
  }

  private async _saveUser(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(UserEntity);
    const rolesRepository = dataSource.getRepository(RolesEntity);
    const permissionsRepository = dataSource.getRepository(PermissionEntity);

    // Tạo permissions
    const permissions = [
      'CREATE_POST',
      'EDIT_POST',
      'DELETE_POST',
      'VIEW_POST',
      'CREATE_COMMENT',
      'DELETE_COMMENT',
      'ADMIN_PANEL',
    ];

    const createdPermissions = await permissionsRepository.save(
      permissions.map((permissionName) => {
        return permissionsRepository.create({
          name: permissionName,
          description: `Permission to ${permissionName}`,
          status: 1,
        });
      }),
    );

    // Tạo roles
    const rolesSaved = [
      {
        name: 'Admin',
        permissions: createdPermissions, // Gán tất cả permissions cho Admin
        status: 1,
      },
      {
        name: 'User',
        permissions: [createdPermissions.find((p) => p.name === 'VIEW_POST')], // Gán một permission cho User
        status: 1,
      },
      {
        name: 'Moderator',
        permissions: [
          createdPermissions.find((p) => p.name === 'CREATE_POST'),
          createdPermissions.find((p) => p.name === 'DELETE_COMMENT'),
        ],
        status: 1,
      },
    ];

    for (const role of rolesSaved) {
      const roleEntity = rolesRepository.create(role);

      await rolesRepository.save(roleEntity);
    }

    const roles = await rolesRepository.find();
    const users = Array.from({ length: 100 }).map(() => {
      return userRepository.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'Admin@123', // Bạn có thể mã hóa mật khẩu nếu cần
        avatarUrl: faker.image.avatar(),
        roles: [roles[Math.floor(Math.random() * roles.length)]], // Gán ngẫu nhiên 1 vai trò cho mỗi user
        status: 1,
      });
    });

    await userRepository.save(users);
  }
}
