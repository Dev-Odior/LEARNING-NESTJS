import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileService } from 'src/user-profile/user-profile.service';

@Module({
  providers: [UsersService, PrismaService, UserProfileService],
  controllers: [UsersController],
})
export class UsersModule {}
