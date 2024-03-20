import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AuthorizationRoleUser } from './authorization.roleUser.model'

@Entity()
export class AuthorizationRole {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @OneToMany(() => AuthorizationRoleUser, roleUser => roleUser.role)
  roleUsers?: AuthorizationRoleUser[]
}
