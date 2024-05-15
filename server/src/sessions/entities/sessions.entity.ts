import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn({ name: 'session_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
