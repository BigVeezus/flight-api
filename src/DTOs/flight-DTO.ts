import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { FetchByMoreInfoEnum } from 'src/Enums/Enum';

export class FlightBoundaryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly bl_lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly bl_lng: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly tr_lat: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  readonly tr_lng: number;

  @IsOptional()
  @IsNumber()
  @Max(300)
  @Type(() => Number)
  readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly minSpeed: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly maxSpeed: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  readonly minAltitude: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly maxAltitude: number;

  @IsOptional()
  @IsString()
  readonly airline: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsString()
  readonly airport: string;

  @IsOptional()
  @IsString()
  readonly reg: string;
}

export class FlightSearchDTO {
  @IsNotEmpty()
  @IsString()
  readonly search: string;

  @IsOptional()
  @IsNumber()
  @Max(25)
  @Type(() => Number)
  readonly limit: number;
}

export class FlightByAirlineDTO {
  @IsNotEmpty()
  @IsString()
  //Change ICAO values to Capital letters to prevent empty response;
  @Transform(({ value }) => value.toUpperCase())
  readonly airline: string;
}

export class FlightsMoreInfoDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(FetchByMoreInfoEnum)
  readonly fetchby: string;

  @IsNotEmpty()
  @IsString()
  readonly query: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly page: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  readonly limit: number;
}

export class FlightTimeDTO {
  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly time: string;
}
