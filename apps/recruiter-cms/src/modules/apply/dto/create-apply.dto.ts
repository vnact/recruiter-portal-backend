import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateApplyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  jobID: number;
}