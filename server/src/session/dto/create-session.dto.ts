import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNotEmpty,
} from 'class-validator';
export class CreateSessionsDto {
  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsString()
  @IsNotEmpty()
  scramble: string;

  @IsBoolean()
  @IsNotEmpty()
  extraTwo: boolean;

  @IsBoolean()
  @IsNotEmpty()
  dnf: boolean;
}
