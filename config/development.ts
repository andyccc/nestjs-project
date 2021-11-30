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
        // timezone: 'UTC',
        charset: 'utf8',
        entities: [
            __dirname + '/../../**/*.entity{.ts,.js}'
        ],
        synchronize: true,
        logging: true,
    },
};