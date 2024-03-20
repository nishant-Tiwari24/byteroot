import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ChallengeCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  imageUrl?: string

  @IsString()
  @IsNotEmpty()
  sampleInput: string

  @IsString()
  @IsNotEmpty()
  sampleOutput: string

  @IsString()
  @IsNotEmpty()
  difficultyLevel: string

  @IsString()
  @IsNotEmpty()
  programmingLanguage: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class ChallengeUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  imageUrl?: string

  @IsString()
  @IsOptional()
  sampleInput?: string

  @IsString()
  @IsOptional()
  sampleOutput?: string

  @IsString()
  @IsOptional()
  difficultyLevel?: string

  @IsString()
  @IsOptional()
  programmingLanguage?: string

  @IsString()
  @IsOptional()
  userId?: string

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
