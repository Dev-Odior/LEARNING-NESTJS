import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { Prisma } from '@prisma/client';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  create(@Body() createUserProfileDto: Prisma.UserProfileCreateInput) {
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  findAll() {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  fineOne(@Param('id') id: string) {
    return this.userProfileService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfileService.remove(id);
  }
}
