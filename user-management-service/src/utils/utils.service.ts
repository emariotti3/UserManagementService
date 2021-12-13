import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

const HASH_FUNCTION = 'sha256'
const ENCODING = 'hex'

@Injectable()
export class UtilsService {

    hashPassword(password): string {
        const hash = createHash(HASH_FUNCTION)
        hash.update(password)
        return hash.digest(ENCODING)
    }
    
}
