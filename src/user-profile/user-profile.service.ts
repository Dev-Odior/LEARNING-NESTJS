import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserProfileDto: Prisma.UserProfileCreateInput) {
    const profile = await this.prismaService.userProfile.create({
      data: createUserProfileDto,
    });

    return profile;
  }

  async findAll() {
    return await this.prismaService.userProfile.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const profile = await this.getWithError(id, true);
    return profile;
  }

  async remove(id: string) {
    this.getWithError(id, true);

    await this.prismaService.userProfile.delete({
      where: {
        id,
      },
    });

    return 'Deleted successfully';
  }

  async getWithError(id: string, withError: boolean = false) {
    const profile = await this.prismaService.userProfile.findUnique({
      where: {
        id,
      },
    });

    if (!profile && withError)
      throw new NotFoundException('User does not exist');

    return profile;
  }
}
