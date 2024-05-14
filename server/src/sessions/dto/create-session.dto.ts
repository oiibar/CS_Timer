import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateSessionDto {
  @IsNotEmpty()
  sessions: string[];
  @IsOptional()
  user?: User;
}
