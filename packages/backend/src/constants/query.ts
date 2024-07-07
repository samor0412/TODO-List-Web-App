import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';

export class QueryOptions {
  @IsObject()
  @IsOptional()
  filter?: Record<string, any>;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderBy?: 'asc' | 'desc';
}
