import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/gaurd';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: any) {
    return user;
  }

  @Patch('edit')
  editUser(@GetUser('_id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('_id') userId: string,
  ) {
    return this.userService.uploadUserProfilePic(userId, file);
  }
}
