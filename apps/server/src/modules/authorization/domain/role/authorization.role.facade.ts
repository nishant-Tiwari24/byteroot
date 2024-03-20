import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseHelper } from '@server/core/database'
import { User } from '@server/modules/user/domain'
import { Repository } from 'typeorm'
import { AuthorizationRole } from './authorization.role.model'

@Injectable()
export class AuthorizationRoleFacade {
  constructor(
    @InjectRepository(AuthorizationRole)
    private repository: Repository<AuthorizationRole>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async findManyByUser(user: User): Promise<AuthorizationRole[]> {
    const roles = await this.repository
      .createQueryBuilder('role')
      .innerJoin('role.roleUsers', 'roleUser', 'roleUser.userId = :userId', {
        userId: user.id,
      })
      .getMany()

    return roles
  }

  async findOneByNameOrFail(name: string): Promise<AuthorizationRole> {
    const role = await this.repository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.roleUsers', 'roleUser')
      .where('role.name = :name', { name })
      .getOne()

    if (!role) {
      this.databaseHelper.notFoundByQuery({ name })
    }

    return role
  }
}
