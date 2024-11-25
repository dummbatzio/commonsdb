import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../iam/user/user.service';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { Assignment } from './assignment.entity';
import { TaskStatus } from './enums/task-status.enum';
import { AssignmentInput } from './dtos/assignment.input';
import { TaskType } from './enums/task-type.enum';
import { Task } from './task.entity';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async assignToUser(input: AssignmentInput, currentUser: ActiveUserData) {
    const user = await this.userService.findOneBy({
      id: currentUser.sub,
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (user.profile.id !== input.profileId) {
      throw new MethodNotAllowedException(
        'User is not allowed to take actions for profile.',
      );
    }

    return await this.assignToProfile(input);
  }

  async assignToProfile(input: AssignmentInput) {
    const profile = await this.profileService.getById(input.profileId);
    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }

    const task = await this.taskRepository.findOne({
      relations: ['series'],
      where: {
        id: input.taskId,
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    if (![TaskStatus.OPEN, TaskStatus.PLANNED].includes(task.status)) {
      throw new MethodNotAllowedException('Cannot assign unopen task.');
    }

    const assignments = this.assignmentRepository.create([
      {
        profile,
        task,
      },
      ...(task.type === TaskType.SERIES && task.series?.length
        ? task.series.map((s: any) => ({
            profile,
            task: s,
          }))
        : []),
    ]);

    await this.assignmentRepository.save(assignments);

    for (const assignment of assignments) {
      assignment.task.status = TaskStatus.PLANNED;
      await this.taskRepository.save(task);
    }

    return assignments.at(0);
  }
}
