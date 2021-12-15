import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

const CONTAINS_LETTERS_REGEX = /[a-zA-Z]/g

/**
 * Validates that a password has at least one uppercase character
 * and one lowercase character.
 */
export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: StrongPasswordConstraint,
        });
    };
}

@ValidatorConstraint({name: 'IsStrongPassword'})
export class StrongPasswordConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        return this.hasUpperCaseCharacters(value) && this.hasUpperCaseCharacters(value) && this.hasLetters(value);
    }

    hasLetters(word) {
        return CONTAINS_LETTERS_REGEX.test(word)
    }

    hasUpperCaseCharacters(word) {
        return word.toLowerCase() != word;
    }

    hasLowerCaseCharacters(word) {
        return word.toUpperCase() != word;
    }
}

