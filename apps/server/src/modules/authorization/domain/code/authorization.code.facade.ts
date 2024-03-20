import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseHelper } from '@server/core/database'
import { Utility } from '@server/helpers/utility'
import { EventService } from '@server/libraries/event'
import { User } from '@server/modules/user/domain'
import { Repository } from 'typeorm'
import { AuthorizationDomainEvent } from '../authorization.domain.event'
import { AuthorizationDomainException } from '../authorization.domain.exception'
import {
  AuthorizationCode,
  AuthorizationCodeStatus,
  AuthorizationCodeType,
} from './authorization.code.model'

@Injectable()
export class AuthorizationCodeFacade {
  constructor(
    @InjectRepository(AuthorizationCode)
    private repository: Repository<AuthorizationCode>,
    private databaseHelper: DatabaseHelper,
    private exception: AuthorizationDomainException,
    private eventService: EventService,
  ) {}
  async createOrFail(
    values: Partial<AuthorizationCode>,
    user: User,
  ): Promise<AuthorizationCode> {
    const keyPublic = await this.buildKey()
    const keyPrivate = await this.buildKey()

    const code = {
      ...values,
      userId: user.id,
      keyPublic,
      keyPrivate,
    } as AuthorizationCode

    const codeCreated = await this.repository.save(code)

    await this.eventService.emit<AuthorizationDomainEvent.CodeCreated.Payload>(
      AuthorizationDomainEvent.CodeCreated.key,
      { authorizationCodeId: code.id },
    )

    return codeCreated
  }

  async check(code: AuthorizationCode): Promise<void> {
    const minutes = code.durationMinutes
    const dateCreated = new Date(code.dateCreated)
    const dateExpiration = new Date(dateCreated.getTime() + minutes * 60000)
    const dateNow = new Date()

    if (dateNow > dateExpiration) {
      throw new Error(
        `Code is expired (${dateNow.getTime()} > ${dateExpiration.getTime()})`,
      )
    }
  }

  async setStatusExpired(code: AuthorizationCode): Promise<AuthorizationCode> {
    return this.update(code, {
      status: AuthorizationCodeStatus.EXPIRED,
    })
  }

  async setStatusUsed(code: AuthorizationCode): Promise<AuthorizationCode> {
    return this.update(code, {
      status: AuthorizationCodeStatus.USED,
    })
  }

  async create(code: Partial<AuthorizationCode>): Promise<AuthorizationCode> {
    return this.repository.save(code)
  }

  async update(
    code: AuthorizationCode,
    values: Partial<AuthorizationCode>,
  ): Promise<AuthorizationCode> {
    const codeUpdated = { ...code, ...values }

    return this.repository.save(codeUpdated)
  }

  async findOneByIdOrFail(codeId: string): Promise<AuthorizationCode> {
    if (!codeId) {
      this.databaseHelper.invalidQueryWhere('codeId')
    }

    const code = await this.repository.findOne({ where: { id: codeId } })

    if (!code) {
      this.exception.codeNotFoundById(codeId)
    }

    return code
  }

  async findOneActiveOrFail(
    user: User,
    keyPrivate: string,
    keyPublic: string,
  ): Promise<AuthorizationCode> {
    const code = await this.repository.findOne({
      where: {
        userId: user.id,
        keyPrivate,
        keyPublic,
        status: AuthorizationCodeStatus.ACTIVE,
      },
    })

    if (!code) {
      this.exception.codeNotFoundByKeys(user, keyPrivate, keyPublic)
    }

    return code
  }

  async findManyByUserAndType(
    user: User,
    type: AuthorizationCodeType,
  ): Promise<AuthorizationCode[]> {
    if (!type) {
      this.databaseHelper.invalidQueryWhere('type')
    }

    const codes = await this.repository.find({
      where: { userId: user.id, type },
    })

    return codes
  }

  async delete(code: AuthorizationCode): Promise<void> {
    await this.repository.softDelete({ id: code.id })
  }

  getKeyPrivate(authorizationCode: AuthorizationCode): string {
    return authorizationCode.keyPrivate
  }

  private async buildKey(): Promise<string> {
    return Utility.buildRandomAlphanumericString(8)
  }
}
