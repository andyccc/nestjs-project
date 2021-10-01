import { MyBaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PostsEntity extends MyBaseEntity {

    @Column({
        name: 'title',
        length: 200,
        comment: 'title field'
    })
    title: string

    @Column({
        name: 'content',
        length: 2000,
        comment: 'content field'
    })
    content: string

    @Column({
        name: 'views',
        type: 'int',
        default: 0,
        comment: 'views field'
    })
    views: number

    @Column({
        name: 'is_pub',
        default: false,
        comment: 'is published field',
    })
    is_pub: boolean




}