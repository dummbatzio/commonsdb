import { ArgsType, Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { TaskType } from '../enums/task-type.enum';
import { BaseAuditDto } from 'src/common/dtos/base-audit.dto';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskRepeat } from '../enums/task-repeat.enum';
import { TaskLinkInput } from './task-link.input';

@ArgsType()
export class DeleteTaskArgs {
  @Field(() => ID)
  id: string;
}

@InputType()
export class TaskInput extends BaseAuditDto {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  type: TaskType;

  @Field(() => [String], { nullable: true })
  categoryIds: string[];

  @Field({ defaultValue: TaskPriority.NONE })
  priority: TaskPriority;

  @Field(() => Int, { defaultValue: 0 })
  expense: number;

  @Field(() => Float, { defaultValue: 1.0 })
  factor: number;

  @Field({ nullable: true })
  due: Date;

  @Field({ nullable: true, defaultValue: TaskPriority.NONE })
  repeat: TaskRepeat;

  @Field(() => [TaskLinkInput], { nullable: true })
  links: TaskLinkInput[];
}
