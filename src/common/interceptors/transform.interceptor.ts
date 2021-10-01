/**
 * see more detail at : https://docs.nestjs.com/interceptors#interceptors
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // throw new Error("Method not implemented.");
        return next.handle().pipe(
            map(data => {
                return {
                    data,
                    code: 1,
                    message: 'success',
                }
            })
        );
    }

}