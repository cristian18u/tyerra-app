import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/auth-local';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserDto } from './users/dto/user.dto';
import { UsersService } from './users/users.service';
const uploadFile = require('./s3.js')


@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get('user')
  async getUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/upload')
  async uploadImag(@Request() req) {
    console.log(req.files)
    const result = await uploadFile(req.files.file)
    console.log('result', result)
    //req.files.file
    return 'archivo subido';
  }
}
