
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity/base.enitity';
import Post from './post.entity';

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name?: string;

    @Column()
    @Exclude()
    public password: string;

    @Column({
        nullable: true
    })
    public avatar?: string

    @Column({
        nullable: true
    })
    @Exclude()
    public currentHashedRefreshToken?: string;

    @OneToMany(() => Post, (post: Post) => post.author)
    public posts?: Post[]
}

export default User;