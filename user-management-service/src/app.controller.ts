import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  /**
   * The root application's endpoint.
   * @returns {string} a greeting string.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
