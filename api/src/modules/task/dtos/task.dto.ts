import { Field, Float, ObjectType } from '@nestjs/graphql';
import { TaskType } from '../enums/task-type.enum';
import { BaseAuditDto } from 'src/common/dtos/base-audit.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskCategoryDto } from './task-category.dto';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskRepeat } from '../enums/task-repeat.enum';
import { TaskLinkDto } from './task-link.dto';

@ObjectType()
export class TaskDto extends BaseAuditDto {
  @Field()
  public title: string;

  @Field({ nullable: true })
  public description: string;

  @Field()
  public status: TaskStatus;

  @Field({ nullable: true })
  public type: TaskType;

  @Field(() => [TaskCategoryDto], { nullable: true })
  public categories: TaskCategoryDto[];

  @Field()
  public priority: TaskPriority;

  @Field()
  public expense: number;

  @Field(() => Float)
  public factor: number;

  @Field({ nullable: true })
  public due: Date;

  @Field({ nullable: true })
  public repeat: TaskRepeat;

  @Field({ nullable: true })
  public parent: TaskDto;

  @Field(() => [TaskDto], { nullable: true })
  public series: TaskDto[];

  @Field(() => [TaskLinkDto], { nullable: true })
  public links: TaskLinkDto[];
}
