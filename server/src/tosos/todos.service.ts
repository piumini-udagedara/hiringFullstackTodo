import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { StatusUpdateTodoDto } from './dto/status-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create({
      ...dto,
      description: dto.description || null,
    });
    await this.todoRepository.save(todo);
    return {
      message: 'Todo created successfully',
    };
  }

  async getTodo(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }
  findAll() {
    return this.todoRepository.find();
  }
  async update(id: number, dto: CreateTodoDto) {
    const todoUpdate = await this.todoRepository.findOne({ where: { id } });
    if (!todoUpdate) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    Object.assign(todoUpdate, { ...dto, description: dto.description || null });
    await this.todoRepository.save(todoUpdate);
    return {
      message: 'Todo updated successfully',
    };
  }

  async delete(id: number) {
    const todoDelete = await this.todoRepository.findOne({ where: { id } });
    if (!todoDelete) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    await this.todoRepository.remove(todoDelete);
    return {
      message: 'Todo deleted successfully',
    };
  }

  async updateStatus(id: number, dto: StatusUpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    todo.done = dto.done;
    await this.todoRepository.save(todo);
    return {
      message: 'Todo Done status updated successfully',
    };
  }
}
