import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FlightBoundaryDto } from './DTOs/flight-DTO';
import { FlightSearchDTO } from './DTOs/flight-DTO';
import { FlightByAirlineDTO } from './DTOs/flight-DTO';
import { FlightsMoreInfoDTO } from './DTOs/flight-DTO';

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

  async getAirlines() {
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/airlines/list`,
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

  async getFlightsByBoundary(query: FlightBoundaryDto) {
    const {
      bl_lat,
      bl_lng,
      tr_lat,
      tr_lng,
      limit,
      minSpeed,
      maxSpeed,
      minAltitude,
      maxAltitude,
      airline,
      airport,
      type,
      reg,
    } = query;
    const options = {
      method: 'GET',
      url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
      params: {
        bl_lat: bl_lat,
        bl_lng: bl_lng,
        tr_lat: tr_lat,
        tr_lng: tr_lng,
        limit: limit,
        speed: `${minSpeed},${maxSpeed}`,
        altitude: `${minAltitude}, ${maxAltitude}`,
        airline: airline,
        airport: airport,
        type: type,
        reg: reg,
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

  async getFlightsByAirline(query: FlightByAirlineDTO) {
    const { airline } = query;
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/list-by-airline`,
      params: {
        airline: `${airline}`,
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

  async getFlights(query: FlightSearchDTO) {
    const { limit, search } = query;
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/search`,
      params: {
        query: `${search}`,
        limit: `${limit}`,
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

  async getMostTrackedFlights() {
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/list-most-tracked`,
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

  async getFlightById(id: string) {
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/detail`,
      params: { flight: `${id}` },
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

  async getFlightHistoryByIdAndTime({ id, query }) {
    const { time, date } = query;
    const unixTime = parseInt(
      (new Date(`${date} ${time}`).getTime() / 1000).toFixed(0),
    );

    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/get-playback`,
      params: {
        flightId: `${id}`,
        timestamp: `${unixTime}`,
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

  async getFlightMoreInfo(queryParam: FlightsMoreInfoDTO) {
    const { fetchby, limit, query, page } = queryParam;
    const options = {
      method: 'GET',
      url: `${FLIGHT_RAPID_URL}/flights/get-more-info`,
      params: {
        query: `${query}`,
        fetchBy: `${fetchby}`,
        limit: `${limit}`,
        page: `${page}`,
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
