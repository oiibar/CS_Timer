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
  Req,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionsDto } from './dto/create-sessions.dto';
import { UpdateSessionDto } from './dto/update-sessions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.sessionsService.findAll(+req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createSessionDto: CreateSessionsDto, @Req() req) {
    return this.sessionsService.create(createSessionDto, +req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }

  // New route to delete all sessions for the authenticated user
  @Delete()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  removeAll(@Req() req) {
    return this.sessionsService.removeAll(+req.user.id);
  }
}
