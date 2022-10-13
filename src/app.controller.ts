import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/auth-local';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import videoEdit from './ffmpeg';
import captureImage from './ffmpegimage';
import { UserDto } from './users/dto/user.dto';
import { UsersService } from './users/users.service';
import { CreateVideoDo } from './video/do/create-video.do';
import { VideoService } from './video/video.service';
const uploadFile = require('./s3.js')


@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService, private videoService: VideoService) { }

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
    try {
      const result = await uploadFile(req.files.file)
      console.log('result', result)
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/video')
  async videoEdit(@Request() req) {
    console.log(req.files)
    const video = new CreateVideoDo()
    try {
      if (req.files) {
        video.title = req.files.file.name
        const result = await videoEdit(req.files.file)
        video.url = result.video.Location
        video.imgUrl = result.image.Location;
        video.date = new Date();
        this.videoService.create(video);
        return result;
      }
      else throw 'not file send'
    } catch (error) {
      return error
    }
  }
  @Post('/image')
  async getImage(@Request() req) {
    console.log(req.files.file)
    try {
      if (req.files) return await captureImage(req.files.file)
      else throw 'not file send'
    } catch (error) {
      return error
    }
  }

}
