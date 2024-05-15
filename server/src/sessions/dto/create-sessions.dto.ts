import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateSessionsDto {
  @IsNotEmpty()
  scramble: string;
  @IsNotEmpty()
  time: number;
  @IsNotEmpty()
  extraTwo: boolean;
  @IsNotEmpty()
  DNF: boolean;
  @IsOptional()
  user?: User;
}
