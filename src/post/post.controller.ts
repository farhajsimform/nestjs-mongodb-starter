import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorator';
import { PostDto } from './dto';
import { JwtGuard } from 'src/auth/gaurd';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('post')
  createPost(@GetUser('id') userId: string, @Body() post: PostDto) {
    return this.postService.create(userId, post);
  }
  @HttpCode(HttpStatus.OK)
  @Get('post')
  getAllPost() {
    return this.postService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('post/:id')
  getPostById(@Param('id') id: string) {
    return this.postService.findById(id);
  }
}
