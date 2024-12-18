import { Field, ObjectType } from '@nestjs/graphql';
import { BaseAuditDto } from 'src/common/dtos/base-audit.dto';
import { ProfileDto } from 'src/modules/profile/dtos/profile.dto';
import { TaskDto } from './task.dto';

@ObjectType()
export class AssignmentDto extends BaseAuditDto {
  @Field()
  public profile: ProfileDto;

  @Field()
  public task: TaskDto;
}
