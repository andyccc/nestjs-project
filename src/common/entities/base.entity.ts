import { Exclude, Transform, TransformFnParams, Type } from "class-transformer";
import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { getStandardDateTime } from "../utils/timeutil";

// @Entity()
export class MyBaseEntity {
    // @Column({
    //     type: 'varchar',// mysql sql string type is varchar
    //     comment: 'primary key field',
    //     length: 30,
    //     primary: true,
    //     name: 'id',
    // })

    // if primary key is not number type ,it has some bugs of missing primary key field when table had some rows.

    @PrimaryColumn({
        name: 'id',
        type: 'varchar',
        primary: true,
        length: 30,
    })
    id: string

    @Column({
        name: 'is_valid',
        default: true,
        comment: 'is enable field'
    })
    @Exclude({ toPlainOnly: true })
    is_valid: boolean

    @CreateDateColumn({
        name: 'create_date',
        nullable: true,
        type: 'datetime'
    })
    @Transform(({ value }) => getStandardDateTime(value), { toPlainOnly: true })
    create_date: Date

    // moment use see : https://momentjs.com/docs/#/parsing/special-formats/
    @Transform(({ value }) => getStandardDateTime(value), { toPlainOnly: true })
    @UpdateDateColumn({
        name: 'update_time',
        nullable: true,
        type: 'datetime'
    })
    @Type(() => String)
    update_time: Date;

    @Column({
        name: 'create_user_id',
        type: 'varchar',
        nullable: true,
        length: 30,
    })
    create_user_id: string

    @Column({
        name: 'update_user_id',
        type: 'varchar',
        nullable: true,
        length: 30,
    })
    update_user_id: string



}