import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { Likes } from './likes.model'

@Injectable()
export class LikesDomainFacade {
  constructor(
    @InjectRepository(Likes)
    private repository: Repository<Likes>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Likes>): Promise<Likes> {
    return this.repository.save(values)
  }
}
