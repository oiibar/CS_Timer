import { IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateSessionsDto {
  @IsNotEmpty()
  sessions: string[];
  @IsOptional()
  user?: User;
}
