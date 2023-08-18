import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aircrafts')
  async getAircrafts() {
    return await this.appService.getAircrafts();
  }

  @Get('flights')
  async getFlights(@Query('ID') query: any) {
    return await this.appService.getFlights({ query });
  }
}
