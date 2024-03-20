import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  pictureUrl: string
}

export class UserUpdateDto {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  pictureUrl?: string
}
