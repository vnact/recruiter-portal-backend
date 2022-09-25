import { UserRole } from '@vnact/recruiter-shared-enum';
import { ApiProperty } from '@nestjs/swagger';

export class JwtClaimsDto {
  @ApiProperty()
  id: number;

  //TODO: switch to claim based authorization
  @ApiProperty()
  role: UserRole;

  constructor(partial: Partial<JwtClaimsDto>) {
    Object.assign(this, partial);
  }
}
