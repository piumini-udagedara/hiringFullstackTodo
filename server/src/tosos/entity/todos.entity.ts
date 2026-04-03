import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true, default: null })
  description: string | null;

  @Column({ type: 'boolean', default: false })
  done: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
