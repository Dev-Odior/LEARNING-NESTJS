import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['ADMIN', 'USER'], { message: 'Valid role required' })
  role: 'ADMIN' | 'USER';
}


