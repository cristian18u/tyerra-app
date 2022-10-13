import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../client', 'dist'),
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://cristian18u:0630@cluster0.ytiw2gl.mongodb.net/tyerra?retryWrites=true&w=majority'),
    VideoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
