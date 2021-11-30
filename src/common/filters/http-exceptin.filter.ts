import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { ApiErrorCode } from "../enums/api-error-code.enum";
import { ApiException } from "../exceptions/api.exception";
import { getStandardDateTime } from "../utils/timeutil";

// global exception returned(filter)
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        // throw new Error("Method not implemented.");
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception.getStatus();

        const exceptionRes: any = exception.getResponse();
        const { error, message } = exceptionRes;


        if (exception instanceof ApiException) {
            response
                .status(status)
                .json({
                    code: exception.getErrorCode(),
                    message: exception.getErrorMessage(),
                    date: getStandardDateTime(new Date()),
                    path: request.url,
                    error,
                });
            return;
        }

        response
            .status(status)
            .json({
                statusCode: status,
                code: ApiErrorCode.FAILED,
                date: getStandardDateTime(new Date()),
                // path: request.url,
                error,
                message
            });

    }

}