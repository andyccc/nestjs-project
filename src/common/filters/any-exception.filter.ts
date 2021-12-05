import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';
import { ApiException } from '../exceptions/api.exception';
import { Logger } from '../utils/log4js';
import { formatReq } from '../utils/request.format';
import { getStandardDateTime } from '../utils/timeutil';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            const exceptionRes: any = exception.getResponse();
            const { error, message } = exceptionRes;
            if (exception instanceof ApiException) {
                const result = {
                    code: exception.getErrorCode(),
                    message: exception.getErrorMessage(),
                    date: getStandardDateTime(new Date()),
                    path: request.url,
                    error,
                };

                this.logError(request, status, result);

                response
                    .status(status)
                    .json(result);
                return;
            }

            const result = {
                statusCode: status,
                code: ApiErrorCode.FAILED,
                date: getStandardDateTime(new Date()),
                // path: request.url,
                error,
                message
            };

            this.logError(request, status, result);

            response
                .status(status)
                .json(result);

            return;
        }

        const result = {
            statusCode: status,
            code: ApiErrorCode.FAILED,
            message: `Service Error: ${exception}`,
        };

        this.logError(request, status, result);

        response.status(status).json(result);
    }

    logError(request, status, exception) {
        // const logFormat = formatReq(request, status, exception, request.user);
        // Logger.error(logFormat);
        // return;

        // 自定义异常格式体
        const logFormat = `
        Method: ${request.method}, Status: ${status}, IP: ${request.ip}, Url: ${request.originalUrl}
        Header: ${JSON.stringify(request.headers)}
        Body: ${request.body ? JSON.stringify(request.body) : '{}'}
        Response: ${JSON.stringify(exception)}`;
        Logger.error(logFormat);

    }


}
