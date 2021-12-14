import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  /**
   * @returns {string} a greeting string.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
