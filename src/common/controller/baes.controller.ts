import { ClassSerializerInterceptor, HttpException, HttpStatus, UseInterceptors } from "@nestjs/common";
import { ApiErrorCode } from "../enums/api-error-code.enum";
import { ApiException } from "../exceptions/api.exception";

@UseInterceptors(ClassSerializerInterceptor)
export abstract class BaseController {

    missingParam(param) {
        throw new ApiException(`${param} id is missing`, ApiErrorCode.PARAM_IS_MISSING);
    }

}