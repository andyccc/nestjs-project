import { ConfigService } from '@nestjs/config'
import { createConnection } from 'typeorm'
import { environment } from 'config';


export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection(environment['default']['DATABASE_CONFIG'])

        // useFactory: async (configService: ConfigService) => {
        //     var ops = configService.get('DATABASE_CONFIG')
        //     console.log('ops: ' + ops);

        //     return await createConnection(ops);
        // },
    }

]