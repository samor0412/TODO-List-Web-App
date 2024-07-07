import { IsEnum, IsString } from 'class-validator';

export class QueryOptions {
  @IsString()
  sortBy: string;

  @IsString()
  @IsEnum(['asc', 'desc'])
  orderBy: 'asc' | 'desc';
}
