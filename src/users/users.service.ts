import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(userDto: UserDto): Promise<User> {
        const createUser = new this.userModel(userDto);
        return createUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    async delete(id: string) {
        const deletedCat = await this.userModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedCat;
    }
    async findOneByUsername(username: string): Promise<User> {
        return this.userModel.findOne({ username: username }).exec();
    }
}
