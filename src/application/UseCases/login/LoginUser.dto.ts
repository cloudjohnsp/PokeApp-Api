import { UserResponseDto } from '@application/repositories/shared/interfaces/UserResponseDto.interface';

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  user: UserResponseDto;
  token: string;
}
