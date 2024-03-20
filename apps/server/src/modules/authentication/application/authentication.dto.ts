import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class AuthenticationLoginDto {
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class AuthenticationRegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: string
}

export class AuthenticationResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: string
}

export class AuthenticationSendEmailResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class GoogleByAuthenticationCallbackDto {
  @IsString()
  @IsNotEmpty()
  token: string
}
