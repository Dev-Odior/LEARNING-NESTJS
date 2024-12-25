import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserProfileService } from 'src/user-profile/user-profile.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async create(
    createUserDto: Prisma.UserCreateInput & { phone: string; address: string },
  ) {
    const { phone, address, ...createUser } = createUserDto;

    const user = await this.prismaService.user.create({
      data: {
        ...createUser,
      },
    });

    await this.userProfileService.create({
      phone,
      address,
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    return user;
  }

  async findAll(role: 'USER' | 'ADMIN') {
    const users = await this.prismaService.user.findMany({
      where: {
        role,
      },
      include: { userProfile: true },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.getWithError(id, true);
    return user;
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    await this.getWithError(id, true);

    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: string) {
    this.getWithError(id, true);

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return 'Deleted successfully';
  }

  async getWithError(id: string, withError: boolean = false) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user && withError) throw new NotFoundException('User does not exist');

    return user;
  }
}
