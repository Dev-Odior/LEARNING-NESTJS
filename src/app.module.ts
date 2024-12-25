import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [UsersModule, TasksModule, PrismaModule, UserProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
