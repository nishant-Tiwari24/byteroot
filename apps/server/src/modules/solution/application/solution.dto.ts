import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class SolutionCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string

  @IsNumber()
  @IsOptional()
  upvotes?: number

  @IsString()
  @IsOptional()
  discussionId?: string

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

export class SolutionUpdateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsNumber()
  @IsOptional()
  upvotes?: number

  @IsString()
  @IsOptional()
  discussionId?: string

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
