import { Injectable } from '@nestjs/common';
import { UserToken } from '../users/interfaces/userToken.interface';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';

const HASH_FUNCTION = 'sha256'
const ENCODING = 'hex'
const TOKEN_EXPIRATION_TIME = '2h'

@Injectable()
export class UtilsService {

    hashPassword(password): string {
        const hash = createHash(HASH_FUNCTION)
        hash.update(password)
        return hash.digest(ENCODING)
    }

    generateJWT(userData): UserToken {
        return { 
            'token': sign(userData, process.env.APP_KEY, { expiresIn: TOKEN_EXPIRATION_TIME }), 
            'expiresIn': TOKEN_EXPIRATION_TIME 
        };  
    } 
    
}
