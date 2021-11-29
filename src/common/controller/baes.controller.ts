import { ClassSerializerInterceptor, HttpException, HttpStatus, UseInterceptors } from "@nestjs/common";

@UseInterceptors(ClassSerializerInterceptor)
export abstract class BaseController {

    missingParam(param) {
        throw new HttpException({ message: `${param} id is missing` }, HttpStatus.BAD_REQUEST);
    }

}