import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoInterface } from './interface/todo.type';
import { StatusUpdateTodoDto } from './dto/status-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  @Get(':id')
  getTodo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoInterface | null> {
    return this.todosService.getTodo(id);
  }

  @Get()
  findAll(): Promise<TodoInterface[] | []> {
    return this.todosService.findAll();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.delete(id);
  }

  @Patch(':id/status')
  updateStuts(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: StatusUpdateTodoDto,
  ) {
    return this.todosService.updateStatus(id, dto);
  }
}
