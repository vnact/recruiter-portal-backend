import { PaginationDto } from '@common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ExpLevel, EmploymentType } from 'src/constants/enum';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class SearchJobDto extends PaginationDto {
  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(50000, { message: 'range 0-50km' })
  rangeMeter: number;

  @ApiProperty({
    default: [],
    enum: ExpLevel,
    isArray: true,
    required: false,
  })
  @IsEnum(ExpLevel, {
    each: true,
  })
  @IsOptional()
  levels?: ExpLevel[];

  @ApiProperty({
    default: [],
    enum: EmploymentType,
    isArray: true,
    required: false,
  })
  @IsEnum(EmploymentType, {
    each: true,
  })
  @IsOptional()
  jobTypes?: EmploymentType[];
}
