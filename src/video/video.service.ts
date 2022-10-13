import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideoDo } from './do/create-video.do';
import { Video, VideoDocument } from './schema/video.schema';

@Injectable()
export class VideoService {

  constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) { }

  async create(createVideoDo: CreateVideoDo) {
    const createVideo = new this.videoModel(createVideoDo);
    return createVideo.save();
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
