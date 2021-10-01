import { createConnection } from 'typeorm'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            charset: 'utf8',
            type: 'mysql',
            host: '192.168.2.152',
            port: 3306,
            username: 'ceshi',
            password: 'ceshi',
            database: 'ceshi',
            entities: [
                __dirname + '/../../**/*.entity{.ts,.js}'
            ],
            synchronize: true // WARNING: Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        })

    }

]