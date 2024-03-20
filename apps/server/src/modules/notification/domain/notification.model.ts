import { User } from '@server/modules/user/domain'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  message: string

  @Column({ nullable: true })
  senderName?: string

  @Column({ nullable: true })
  senderEmail?: string

  @Column({ nullable: true })
  senderPictureUrl?: string

  @Column({ nullable: true })
  redirectUrl?: string

  @Column()
  userId: string
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
