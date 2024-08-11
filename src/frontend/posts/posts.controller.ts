import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
import { ResponseMessage } from 'src/utils/interceptor-response/response.decorator';
import { PaginationParams } from 'src/utils/types/paginationParams';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { METHOD_SUCCESS } from 'src/utils/interceptor-response/response.constants';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getAll() {
    return await this.postsService.getall();
  }

  @Get('getbyid')
  @UseGuards(JwtAuthenticationGuard)
  async getbyid(@Query('id') id: number) {
    return await this.postsService.getById(id)
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return await this.postsService.create(post, req.user);
  }

  @Get('search')
  async getPosts(
    @Query('key') search: string,
    @Query() { offset = 0, limit = 10 }: PaginationParams
  ) {
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit);
    }
    return this.postsService.getAllPosts(offset, limit);
  }

}
