/**
 * see more detail at : https://docs.nestjs.com/interceptors#interceptors
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ApiErrorCode } from "../enums/api-error-code.enum";
import { Logger } from "../utils/log4js";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // throw new Error("Method not implemented.");

        const req = context.getArgByIndex(1).req

        return next.handle().pipe(
            map(data => {

                const logFormat = JSON.stringify({
                    IP: req.ip,
                    user: `${req.user}`,
                    res_url: req.originalUrl,
                    res_method: req.method,
                    res_data: data,
                })
                Logger.info(logFormat);
                Logger.access(logFormat);






                return {
                    data,
                    code: ApiErrorCode.SUCCESS,
                    message: 'success',
                }
            })
        );
    }

}

// log :


// info: 2019-07-25 18:04:36
//     POST /v1.0/standard
//     Query:
//         search: keyword
//     Header:
//         cache-control: no-cache
//         postman-token: f4103067-4b07-447d-9fab-f09a75b6ddda
//         content-type: application/json
//         user-agent: PostmanRuntime/3.0.11-hotfix.2
//         accept: */*
//         host: localhost:4000
//         accept-encoding: gzip, deflate
//         content-length: 209
//         connection: keep-alive
//     Body:
//         appId: XXX
//         data:
//             userId: 123
//             requestId: 456
//         timestamp: 0


