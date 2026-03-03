import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Schema, ValidationError } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: Schema<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      return this.schema.validateSync(value, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string[]> = {};

        error.inner.forEach((err: ValidationError) => {
          const path = err.path || 'unknown';
          const messages = errors[path] || [];
          errors[path] = [err.message, ...messages];
        });

        throw new HttpException(
          {
            message: 'Validation failed',
            errors: errors,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      throw new HttpException(
        {
          message: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}