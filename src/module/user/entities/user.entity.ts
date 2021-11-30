import { Exclude, Transform } from "class-transformer";
import { MyBaseEntity } from "src/common/entities/base.entity";
import { getStandardDateTime } from "src/common/utils/timeutil";
import { Column, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity extends MyBaseEntity {

    @Column({
        name: 'username',
        length: 20,
        comment: 'username field'
    })
    username: string

    @Column({
        name: 'password',
        length: 50,
        comment: 'password field'
    })
    @Exclude({ toPlainOnly: true })
    password: string

    @Column({
        name: 'email',
        length: 50,
        comment: 'email field'
    })
    email: string

    @UpdateDateColumn({
        name: 'login_date',
        type: 'datetime'
    })

    @Transform(({ value }) => getStandardDateTime(value), { toPlainOnly: true })

    login_date: Date

    @Column({
        name: 'login_token',
        length: 200,
        comment: 'login token field',
        nullable: true,
    })
    login_token: string


}
