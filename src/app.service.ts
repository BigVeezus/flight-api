import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getAircrafts() {
    const options = {
      method: 'GET',
      url: 'https://flight-radar1.p.rapidapi.com/aircrafts/list',
      headers: {
        'X-RapidAPI-Key': '158dae292amsh0191827cf1dd90ep1e608fjsn996b58900bfc',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com',
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
      url: 'https://flight-radar1.p.rapidapi.com/flights/search',
      params: {
        query: `${query}`,
        limit: '25',
      },
      headers: {
        'X-RapidAPI-Key': '158dae292amsh0191827cf1dd90ep1e608fjsn996b58900bfc',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com',
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
