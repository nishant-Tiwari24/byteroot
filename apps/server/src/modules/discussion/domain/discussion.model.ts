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

import { Challenge } from '../../../modules/challenge/domain'

import { User } from '../../../modules/user/domain'

import { Solution } from '../../../modules/solution/domain'

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  content: string

  @Column({})
  challengeId: string

  @ManyToOne(() => Challenge, parent => parent.discussions)
  @JoinColumn({ name: 'challengeId' })
  challenge?: Challenge

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.discussions)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Solution, child => child.discussion)
  solutions?: Solution[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
