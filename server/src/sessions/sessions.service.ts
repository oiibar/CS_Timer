import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionsDto } from './dto/create-sessions.dto';
import { UpdateSessionDto } from './dto/update-sessions.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from './entities/sessions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private readonly sessionsRepository: Repository<Sessions>,
  ) {}

  async create(createSessionsDto: CreateSessionsDto, id: number) {
    const newSession = {
      time: createSessionsDto.time,
      scrumble: createSessionsDto.scramble,
      extraTwo: createSessionsDto.extraTwo,
      DNF: createSessionsDto.DNF,
      user: { id },
    };

    return await this.sessionsRepository.save(newSession);
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
