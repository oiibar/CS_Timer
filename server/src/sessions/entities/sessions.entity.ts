import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sessions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scramble: string;

  @Column({ type: 'real' })
  time: string;

  @Column({ default: false })
  extraTwo: boolean;

  @Column({ default: false })
  DNF: boolean;

  @ManyToOne(() => User, (user) => user.sessions, { eager: true })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
