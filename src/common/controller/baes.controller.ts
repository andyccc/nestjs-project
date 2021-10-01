import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class BaseController {

    abstract index(any);

    abstract pageList(any);

    abstract create(any);

    missingParam(param) {
        throw new HttpException({ message: `${param} id is missing` }, HttpStatus.BAD_REQUEST);
    }

}