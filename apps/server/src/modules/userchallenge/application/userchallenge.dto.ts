import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class UserchallengeCreateDto {
  @IsString()
  @IsNotEmpty()
  relationType: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  challengeId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class UserchallengeUpdateDto {
  @IsString()
  @IsOptional()
  relationType?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  challengeId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
