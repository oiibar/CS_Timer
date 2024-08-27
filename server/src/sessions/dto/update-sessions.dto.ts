import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class UpdateSessionDto {
  @IsNotEmpty()
  scramble: string;
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  extraTwo: boolean;
  @IsNotEmpty()
  DNF: boolean;
  @IsOptional()
  user?: User;
}
