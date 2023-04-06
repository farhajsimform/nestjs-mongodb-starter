import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../mongoose/schema/user.schema';
import { EditUserDto } from './dto';
import { CloudinaryService } from 'nestjs-cloudinary';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async editUser(userId: string, dto: EditUserDto) {
    await this.userModel.updateOne({ _id: userId }, { ...dto });

    const user = await this.userModel.findById(userId, { password: 0 }).lean();

    return user;
  }

  async uploadUserProfilePic(userId: string, file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
