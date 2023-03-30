import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../mongoose/schema/user.schema';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const savedUser = await this.userModel.create({
        email: dto.email,
        password: hash,
      });
      return savedUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException('Duplicate key error');
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.userModel.findOne({
      email: dto.email,
    });
    if (!user) {
      throw new ForbiddenException('Incorrect Credentils');
    }
    const matchPassword = await argon.verify(user.password, dto.password);
    if (!matchPassword) {
      throw new ForbiddenException('Incorrect Credentils');
    }
    return this.siginToken(user._id, user.email);
  }
  async siginToken(
    userId: number,
    userEmail: string,
  ): Promise<{
    access_token: string;
  }> {
    const payload = {
      sub: userId,
      email: userEmail,
    };
    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }

  async verifyToken(token: string) {
    const decoded = await this.jwt.verifyAsync(token, {
      secret: this.config.get('JWT_SECRET'),
    });
    return decoded;
  }
}
