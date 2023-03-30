import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../mongoose/schema/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private authService: AuthService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization?.split?.(' ')?.[1];
    try {
      return new Promise(async (resolve, reject) => {
        const decoded = (await this.authService.verifyToken(
          bearerToken,
        )) as any;
        const user = await this.validateRequest(decoded);
        if (user) {
          context.switchToHttp().getRequest().user = user;
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
