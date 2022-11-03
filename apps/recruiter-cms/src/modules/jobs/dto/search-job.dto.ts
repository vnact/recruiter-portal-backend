import { PaginationDto } from '@common/dto/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpLevel, EmploymentType } from 'src/constants/enum';
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
  @IsLatitude()
  @IsOptional()
  lat?: number;

  @ApiProperty()
  @IsLongitude()
  @IsOptional()
  lng?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(50000, { message: 'range 0-50km' })
  @IsOptional()
  rangeMeter?: number;

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

  @ApiPropertyOptional({
    type: [Number],
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  careers?: number[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  startSalary?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  endSalary?: number;
}
