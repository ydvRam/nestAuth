import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  // only admin can create user
  // @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  // any logged-in user can see users
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}