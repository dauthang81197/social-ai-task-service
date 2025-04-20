import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { QueryPaginationDto, SortEnum } from 'src/common';

export class QueryPostDto extends QueryPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search by ID, Name',
  })
  @Optional()
  searchKey = '';

  @ApiProperty({
    enum: SortEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortEnum, {
    message: 'common.INVALID_SORT_VALUE',
  })
  sortBy: SortEnum;
}

export class QueryPlanBySearchKeyNameOrId {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search by Name or ID',
  })
  @Optional()
  searchKey = '';
}
