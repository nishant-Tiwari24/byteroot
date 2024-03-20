import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseHelper } from '@server/core/database'
import { HashHelper } from '@server/helpers/hash/hash.helper'
import { RequestHelper } from '@server/helpers/request'
import { Utility } from '@server/helpers/utility'
import { AuthorizationCode } from '@server/modules/authorization/domain'
import { Repository } from 'typeorm'
import { UserException } from './user.exception'
import { User, UserStatus } from './user.model'

@Injectable()
export class UserDomainFacade {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private databaseHelper: DatabaseHelper,
    private exception: UserException,
  ) {}

  create(values: Partial<User>): Promise<User> {
    const user = {
      ...values,
    } as User

    if (user.email) {
      user.email = user.email.trim().toLowerCase()
    }

    return this.repository.save(user)
  }

  update(user: User, values: Partial<User>): Promise<User> {
    const userUpdated = {
      ...user,
      ...values,
    }

    if (userUpdated.email) {
      userUpdated.email = userUpdated.email.trim().toLowerCase()
    }

    return this.repository.save(userUpdated)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<User> = {},
  ): Promise<User[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByEmailWithPassword(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email: email.trim().toLowerCase() },
      select: ['id', 'email', 'password'],
    })

    if (!user) {
      this.exception.notFoundByEmail(email)
    }

    return user
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<User> = {},
  ): Promise<User> {
    if (!Utility.isDefined(id)) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const user = await query.getOne()

    if (!user) {
      this.exception.notFoundById(id)
    }

    return user
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    if (!Utility.isDefined(email)) {
      this.databaseHelper.invalidQueryWhere('email')
    }

    const user = await this.repository.findOne({
      where: { email: email.trim().toLowerCase() },
    })

    if (!user) {
      this.exception.notFoundByEmail(email)
    }

    return user
  }

  async findOneByAuthorizationCodeOrFail(
    authorizationCode: AuthorizationCode,
  ): Promise<User> {
    const id = authorizationCode.userId

    if (!Utility.isDefined(id)) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const user = await this.repository.findOne({
      where: { id },
    })

    if (!user) {
      this.exception.notFoundById(id)
    }

    return user
  }

  async delete(user: User): Promise<void> {
    await this.repository.softDelete(user.id)
  }

  async hashPassword(password: string): Promise<string> {
    return HashHelper.run(password)
  }

  async verifyPassword(user: User, password: string): Promise<void> {
    const isMatch = HashHelper.verify(password, user.password)

    if (isMatch) {
      return
    } else {
      throw new Error(`Password is incorrect.`)
    }
  }

  async isVerified(user: User): Promise<boolean> {
    return user.status === UserStatus.VERIFIED
  }

  setVerified(user: User): Promise<User> {
    return this.update(user, { status: UserStatus.VERIFIED })
  }
}
