import { User } from '@server/modules/user/domain'
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { AuthorizationRole } from './authorization.role.model'

@Entity()
export class AuthorizationRoleUser {
  @PrimaryColumn()
  userId: string
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User

  @PrimaryColumn()
  roleId: string
  @ManyToOne(() => AuthorizationRole)
  @JoinColumn({ name: 'roleId' })
  role?: AuthorizationRole
}
