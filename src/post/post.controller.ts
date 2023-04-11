import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorator';
import { PostDto } from './dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create-post')
  getMe(@GetUser() user: any, @Body() post: PostDto) {
    console.log(user, post);
    return true;
  }
}
