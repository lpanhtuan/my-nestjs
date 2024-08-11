import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './baseEntity/base.enitity'
import User from './user.entity'

@Entity()
class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postId?: number

    @Column()
    public title?: string

    @Column()
    public des: string

    @ManyToOne(() => User, (author: User) => author.posts)
    public author?: User
}

export default Post
