import * as Bcrypt from 'bcryptjs'

const saltRounds = 10

export namespace HashHelper {
  export function run(content: string): string {
    const salt = Bcrypt.genSaltSync(saltRounds)
    const hash = Bcrypt.hashSync(content, salt)

    return hash
  }

  export function verify(value: string, valueHash: string): boolean {
    return Bcrypt.compareSync(value, valueHash)
  }
}
