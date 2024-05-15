import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      scramble: createSessionsDto.scramble,
      extraTwo: createSessionsDto.extraTwo,
      DNF: createSessionsDto.DNF,
      user: { id },
    };

    return await this.sessionsRepository.save(newSession);
  }

  async findAll(id: number) {
    return await this.sessionsRepository.find({
      where: {
        user: { id },
      },
    });
  }

  async findOne(id: number) {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!session) throw new NotFoundException('Session not found!');

    return session;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const session = await this.sessionsRepository.findOne({
      where: { id },
    });

    if (!session) throw new NotFoundException('Session not found!');

    return await this.sessionsRepository.update(id, updateSessionDto);
  }

  async remove(id: number) {
    const session = await this.sessionsRepository.findOne({
      where: { id },
    });

    if (!session) throw new NotFoundException('Session not found!');

    return await this.sessionsRepository.delete(id);
  }
}
