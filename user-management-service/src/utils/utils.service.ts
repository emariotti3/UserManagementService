import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

const HASH_FUNCTION = 'sha256'
const ENCODING = 'hex'

@Injectable()
export class UtilsService {

    /**
     * Given a password, create a hash for that password,
     * @param {string} password - The password to hash.
     * @returns {string} a hashed password.
     */
    static hashPassword(password): string {
        const hash = createHash(HASH_FUNCTION)
        hash.update(password)
        return hash.digest(ENCODING)
    }
}
