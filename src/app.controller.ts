import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FlightBoundaryDto } from './DTOs/flight-DTO';
import { FlightSearchDTO } from './DTOs/flight-DTO';
import { FlightByAirlineDTO } from './DTOs/flight-DTO';
import { FlightsMoreInfoDTO } from './DTOs/flight-DTO';
import { FlightTimeDTO } from './DTOs/flight-DTO';
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aircrafts')
  async getAircrafts() {
    return await this.appService.getAircrafts();
  }

  @Get('airlines')
  async getAirlines() {
    return await this.appService.getAirlines();
  }

  @Get('flights')
  async getFlights(@Query() query: FlightSearchDTO) {
    return await this.appService.getFlights(query);
  }

  @Get('flights/by-boundary')
  async getFlightsByBoundary(@Query() query: FlightBoundaryDto) {
    return await this.appService.getFlightsByBoundary(query);
  }

  @Get('flights/by-airline')
  async getFlightsByAirline(@Query() query: FlightByAirlineDTO) {
    return await this.appService.getFlightsByAirline(query);
  }

  @Get('flights/most-tracked')
  async getMostTrackedFlights() {
    return await this.appService.getMostTrackedFlights();
  }

  @Get('flights/get-more-info')
  async getFlightMoreInfo(@Query() queryParam: FlightsMoreInfoDTO) {
    return await this.appService.getFlightMoreInfo(queryParam);
  }

  @Get('flight/:id')
  async getFlightById(@Param('id') id: string) {
    return await this.appService.getFlightById(id);
  }

  @Get('flight/history/:id')
  async getFlightHistoryByIdAndTime(
    @Param('id') id: string,
    @Query() query: FlightTimeDTO,
  ) {
    return await this.appService.getFlightHistoryByIdAndTime({ id, query });
  }
}
