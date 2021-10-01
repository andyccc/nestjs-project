import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform, Type } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        // throw new Error("Method not implemented.");

        // tslint:disable-next-line
        // console.log(value, 'validation.pipe', metadata, 'metadata');

        const { metatype } = metadata;

        // if not pass validate rule, else not validate and direct return data
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        // cast to class
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            // return all err message
            // const erroObj = {};
            // errors.forEach(err => {
            //     const {
            //         property,
            //         constraints,
            //     } = err;
            //     erroObj[property] = Object.values(constraints);
            // });

            // only get first err message
            const errObj = Object.values(errors[0].constraints)[0];
            throw new HttpException(
                {
                    message: errObj,
                    error: 'Request params validation failed'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }

}