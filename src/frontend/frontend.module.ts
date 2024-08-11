import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProductModule } from './product/product.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UsersModule, PostsModule, ProductModule],
})
export class FrontendModule { }
