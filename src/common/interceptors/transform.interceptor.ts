/**
 * see more detail at : https://docs.nestjs.com/interceptors#interceptors
 */

import { CallHandler, ExecutionContext, HttpCode, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ApiErrorCode } from "../enums/api-error-code.enum";
import { Logger } from "../utils/log4js";
import { formatReq } from "../utils/request.format";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // throw new Error("Method not implemented.");

        const req = context.getArgByIndex(1).req

        return next.handle().pipe(
            map(data => {

                const result = {
                    data,
                    code: ApiErrorCode.SUCCESS,
                    message: 'success',
                };

                const logFormat = JSON.stringify({
                    IP: req.ip,
                    res_method: req.method,
                    res_url: req.originalUrl,
                    user: req.user ? req.user : {},
                    header: req.headers ? req.headers : {},
                    body: req.body ? req.body : {},
                    res_data: result,
                })

                // const logFormat = formatReq(req, 200, result, req.user);

                Logger.info(logFormat);
                Logger.access(logFormat);
                return result;
            })
        );
    }

}
