import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn({ name: 'sessions_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @OneToMany(() => Session, (session) => session.sessions)
  session: Session[];
}
