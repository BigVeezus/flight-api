import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

let FLIGHT_RAPID_URL: string;
let FLIGHT_API_KEY: string;
let FLIGHT_API_HOST: string;
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    FLIGHT_RAPID_URL = this.configService.get<string>('FLIGHT_RAPID_URL');
    FLIGHT_API_KEY = this.configService.get<string>('FLIGHT_API_KEY');
    FLIGHT_API_HOST = this.configService.get<string>('FLIGHT_API_HOST');
  }
  async getAircrafts() {
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/aircrafts/list`,
      headers: {
        'X-RapidAPI-Key': FLIGHT_API_KEY,
        'X-RapidAPI-Host': FLIGHT_API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getFlights({ query }) {
    console.log(query);
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/search`,
      params: {
        query: `${query}`,
        limit: '25',
      },
      headers: {
        'X-RapidAPI-Key': FLIGHT_API_KEY,
        'X-RapidAPI-Host': FLIGHT_API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
