import { Body, Controller, Post } from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }
}
