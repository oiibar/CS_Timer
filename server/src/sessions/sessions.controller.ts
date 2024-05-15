import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionsDto } from './dto/create-sessions.dto';
import { UpdateSessionDto } from './dto/update-sessions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createSessionDto: CreateSessionsDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
