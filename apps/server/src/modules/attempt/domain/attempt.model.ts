import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../../modules/user/domain'

import { Challenge } from '../../../modules/challenge/domain'

@Entity()
export class Attempt {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  status: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.attempts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  challengeId: string

  @ManyToOne(() => Challenge, parent => parent.attempts)
  @JoinColumn({ name: 'challengeId' })
  challenge?: Challenge

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
