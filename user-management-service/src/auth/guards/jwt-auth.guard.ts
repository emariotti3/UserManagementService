import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A guard to validate that an endpoint receives
 * a valid jwt token in its authentication header.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
