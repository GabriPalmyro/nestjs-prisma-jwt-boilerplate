/* eslint-disable prettier/prettier */
import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { VALIDATION_MESSAGES } from '../validations/auth-validation-messages';


interface ValidationError {
    property: string;
    constraints: {
      [type: string]: string;
    };
  }

@Injectable()
export class AuthValidationPipe implements PipeTransform<any> {


  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { forbidUnknownValues: true });

    if (errors.length > 0) {
      const errorMessages = this.buildErrorMessages(errors);
      throw new BadRequestException({ message: errorMessages });
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const typesToValidate = [String, Boolean, Number, Array, Object];
    return !typesToValidate.includes(metatype);
  }

  private buildErrorMessages(errors: unknown[]): string[] {
    return errors.map((error: unknown) => {
      if (typeof error !== 'object' || error === null) {
        throw new Error(`Invalid error object: ${error}`);
      }
  
      const { property, constraints } = error as ValidationError;
  
      const [firstLevelProperty] = property.split('.');
      const messages = Object.values(constraints).map(constraint => this.getErrorMessage(firstLevelProperty, constraint));
      return messages.join('; ');
    });
  }

  private getErrorMessage(property: string, constraint: string): string {
    const messageFn = VALIDATION_MESSAGES[constraint];
    return messageFn ? messageFn(property) : constraint;
  }
}
