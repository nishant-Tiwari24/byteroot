import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthorizationCreateCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class AuthorizationVerifyCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  keyPrivate: string

  @IsString()
  @IsNotEmpty()
  keyPublic: string
}
