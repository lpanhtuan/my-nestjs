import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ResponseError } from 'src/common/response/Response'
import User from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import Post from '../../entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ) {}

    async getall() {
        // const data = await this.postsRepository.query(
        //     `SELECT CASE WHEN EXISTS (SELECT 1 FROM db_nests.post WHERE postId = 1) THEN (SELECT title FROM db_nests.post WHERE postId = 1) ELSE NULL END AS title;`
        // )
        const data = await this.postsRepository.find()
        if (!data) {
            throw new HttpException('Not found', 404)
        }
        return data
    }

    async getById(id: number) {
        const data = await this.postsRepository.findOne({
            where: {
                postId: id,
            },
            relations: ['author'],
        })
        return data
    }

    async create(createPostDto: CreatePostDto, user: User) {
        const data = this.postsRepository.create({
            ...createPostDto,
            author: user,
        })
        this.postsRepository.save(data)
        return data
    }

    async updatePost(id: number, post: UpdatePostDto) {
        await this.postsRepository.update(id, post)
        const updatedPost = await this.postsRepository.findOne({
            where: {
                postId: id,
            },
            relations: ['author'],
        })
        if (updatedPost) {
            return updatedPost
        }
        throw new ResponseError('Post not found', 404)
    }

    async searchForPosts(search: string, offset: number, limit: number) {
        const data = await this.postsRepository.query(
            `select * from db_nests.post where title like '%${search}%' limit ${offset}, ${limit}`
        )
        // const data = await this.postsRepository.createQueryBuilder('post').where('title like :search', { search: `%${search}%` }).skip(offset).take(limit).getMany()
        return data
    }

    async getAllPosts(offset: number, limit: number) {
        const [items, count] = await this.postsRepository.findAndCount({
            relations: ['author'],
            order: {
                postId: 'ASC',
            },
            skip: offset,
            take: limit,
        })

        return {
            items,
            count,
        }
    }
}
