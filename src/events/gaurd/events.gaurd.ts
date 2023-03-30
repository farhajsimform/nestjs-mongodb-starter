import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../mongoose/schema/user.schema';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private config: ConfigService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(
        bearerToken,
        this.config.get('JWT_SECRET'),
      ) as any;
      return new Promise(async (resolve, reject) => {
        const user = await this.validateRequest(decoded);
        if (user) {
          resolve(user);
        } else {
          reject(false);
        }
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
  async validateRequest(payload: { sub: string; email: string }) {
    const user = await this.userModel.findById(payload.sub).lean();
    return user;
  }
}
