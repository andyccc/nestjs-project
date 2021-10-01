import { Connection } from "typeorm";
import { PostsEntity } from "./entities/posts.entity";

export const postsProviders = [
    {
        provide: 'POSTS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PostsEntity),
        inject: ['DATABASE_CONNECTION']
    }

]