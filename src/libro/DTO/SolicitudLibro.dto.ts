import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class SolicitudLibroDto {

  @IsDate()
  fechaDeSolicitud: Date;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  grade: string

  @IsString()
  @IsOptional()
  rut: string

  @IsDate()
  @IsOptional()
  fechaDeDevolucion: Date;

  @IsNumber()
  idLibro: number
}