import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AttemptCreateDto {
  @IsString()
  @IsNotEmpty()
  status: string

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

export class AttemptUpdateDto {
  @IsString()
  @IsOptional()
  status?: string

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
