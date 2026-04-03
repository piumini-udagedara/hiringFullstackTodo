import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class StatusUpdateTodoDto {
  @ApiProperty()
  @IsBoolean()
  done: boolean;
}
