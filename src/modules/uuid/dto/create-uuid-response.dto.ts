export class CreateUUIDResponseDto {
  _id: string;
  account: string;
}

export class CreateUUIDAxiosResponseDto {
  error: boolean;
  message?: string;
  data?: {
    userInfo?: CreateUUIDResponseDto;
  };
}
