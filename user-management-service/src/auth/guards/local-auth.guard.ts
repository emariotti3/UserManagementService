import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A guard to validate that the user requesting access
 * has been previously registered and is providing a
 * valid username and password.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}