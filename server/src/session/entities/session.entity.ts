import { Sessions } from 'src/sessions/entities/sessions.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn({ name: 'session_id' })
  id: number;

  @Column()
  time: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  scramble: string;

  @Column({ default: false })
  extraTwo: boolean;

  @Column({ default: false })
  DNF: boolean;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @ManyToOne(() => Sessions, (sessions) => sessions.sessions)
  sessions: Sessions;
}
