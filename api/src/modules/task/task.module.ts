import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskCategory } from './task-category.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { TaskCategoryService } from './task-category.service';
import { TaskLink } from './task-link.entity';
import { TaskLinkService } from './task-link.service';
import { Assignment } from './assignment.entity';
import { AssignmentService } from './assignment.service';
import { WalletModule } from '../wallet/wallet.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskCategory, TaskLink, Assignment]),
    UserModule,
    WalletModule,
  ],
  providers: [
    TaskResolver,
    TaskService,
    TaskCategoryService,
    TaskLinkService,
    AssignmentService,
  ],
})
export class TaskModule {}
