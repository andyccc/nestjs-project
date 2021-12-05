import { DbLogger } from 'src/common/utils/log4js';
import { ConnectionOptions } from 'typeorm';


export default {
    // 端口
    port: parseInt(process.env.PORT, 10) || 3000,
    // 是否开启swagger
    enableSwagger: true,
    // 数据库配置
    DATABASE_CONFIG: {
        type: 'mysql',
        host: '192.168.2.152',
        port: 3306,
        username: 'ceshi',
        password: 'ceshi',
        database: 'ceshi',
        charset: 'utf8',
        maxQueryExecutionTime: 1000,
        entities: [
            // __dirname + '/../../**/*.entity{.ts,.js}',
            'dist/src/module/**/entities/*.entity.{ts,js}',
        ],
        synchronize: true, // WARNING: Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.        
        logging: true,
        logger: new DbLogger(),
        // timezone: 'UTC',
        timezone: '+08:00',
    },
    REDIS_CONFIG: {
        port: 6379,
        host: '192.168.2.152',
        password: 'redis@2021',
        db: 0,
    },
};
