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

import { Discussion } from '../../../modules/discussion/domain'

@Entity()
export class Solution {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  content: string

  @ColumnNumeric({ default: 0, type: 'numeric' })
  upvotes: number

  @Column({})
  discussionId: string

  @ManyToOne(() => Discussion, parent => parent.solutions)
  @JoinColumn({ name: 'discussionId' })
  discussion?: Discussion

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
