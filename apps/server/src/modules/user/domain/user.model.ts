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

import { Notification } from '../../../modules/notification/domain'

import { Challenge } from '../../../modules/challenge/domain'

import { Attempt } from '../../../modules/attempt/domain'

import { Discussion } from '../../../modules/discussion/domain'

import { Userchallenge } from '../../../modules/userchallenge/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Challenge, child => child.user)
  challenges?: Challenge[]

  @OneToMany(() => Attempt, child => child.user)
  attempts?: Attempt[]

  @OneToMany(() => Discussion, child => child.user)
  discussions?: Discussion[]

  @OneToMany(() => Userchallenge, child => child.user)
  userchallenges?: Userchallenge[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
