import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionsDto } from './create-sessions.dto';

export class UpdateSessionDto extends PartialType(CreateSessionsDto) {}
