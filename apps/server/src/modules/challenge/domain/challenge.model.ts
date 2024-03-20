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

import { Attempt } from '../../../modules/attempt/domain'

import { Discussion } from '../../../modules/discussion/domain'

import { Userchallenge } from '../../../modules/userchallenge/domain'

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  imageUrl?: string

  @Column({})
  sampleInput: string

  @Column({})
  sampleOutput: string

  @Column({})
  difficultyLevel: string

  @Column({})
  programmingLanguage: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.challenges)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Attempt, child => child.challenge)
  attempts?: Attempt[]

  @OneToMany(() => Discussion, child => child.challenge)
  discussions?: Discussion[]

  @OneToMany(() => Userchallenge, child => child.challenge)
  userchallenges?: Userchallenge[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
