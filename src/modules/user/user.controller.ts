import { Body, Controller, Get, Param, Put, Req, UseGuards, Delete, Query } from '@nestjs/common';
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
  @Roles('user', 'admin')
  @Put('profile')
  async updateCurrentUser(
    @Req() req,
    @Body() updatedData: UserDTO,
  ): Promise<UserEntity | null> {
    const userEntityUpd = new UserEntity();
    Object.assign(userEntityUpd, updatedData);
    return await this.userService.updateCurrentUser(userEntityUpd, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user','admin')
  @Get('profile')
  async getCurrentUserInfo(
    @Req() req,
  ): Promise<UserEntity> {
    return await this.userService.getCurrentUserInfo(req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('get-users')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<
  { data: UserEntity[], 
    total: number, 
    page: number, 
    limit: number }> {
    return await this.userService.getAllUsers({page, limit});
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'coach')
  @Get(':id')
  async getUserById(
    @Param('id') id: number,
  ): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
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
