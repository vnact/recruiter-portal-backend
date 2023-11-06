import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty({ example: 'ey...' })
  accessToken: string;

  @ApiProperty({ example: '2022-05-22T14:20:23.410Z' })
  accessTokenExpired: string;

  constructor(partial: Partial<TokenPayloadDto>) {
    Object.assign(this, partial);
  }
}
