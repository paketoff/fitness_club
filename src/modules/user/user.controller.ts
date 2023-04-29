import { Body, Controller, Get, Param, Put, Req, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserDTO } from './DTO/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('get-users')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user', 'coach')
  @Get('get-users')
  async getUserById(
    @Param('id') id: number,
  ): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Req() req,
    @Body() updatedData: UserDTO,
  ): Promise<UserEntity | null> {
    const userEntityUpd = new UserEntity();
    Object.assign(userEntityUpd, updatedData);
    return await this.userService.updateUserById(id, userEntityUpd, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<void> {
    return await this.userService.deleteUserById(id);
  }
}
