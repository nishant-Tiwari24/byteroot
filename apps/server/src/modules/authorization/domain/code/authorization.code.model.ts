import { Min } from 'class-validator'
import { User } from '@server/modules/user/domain'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export enum AuthorizationCodeType {
  USER_VERIFICATION = 'user.verification',
}

export enum AuthorizationCodeStatus {
  ACTIVE = 'ACTIVE',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
}

@Entity()
export class AuthorizationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  keyPublic: string

  @Column()
  keyPrivate: string

  @Column({ default: 60 })
  @Min(0)
  durationMinutes: number

  @Column({ enum: AuthorizationCodeType })
  type: AuthorizationCodeType

  @Column({
    enum: AuthorizationCodeStatus,
    default: AuthorizationCodeStatus.ACTIVE,
  })
  status: AuthorizationCodeStatus

  @CreateDateColumn({ type: 'timestamp with time zone' })
  dateCreated: string

  @DeleteDateColumn()
  dateDeleted: string

  /* -------------------------------- RELATIONS ------------------------------- */
  @Column()
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User
}
