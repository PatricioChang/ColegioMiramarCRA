import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class SolicitudLibroDto {

  @IsDate()
  fechaDeSolicitud: Date;

  @IsString()
  nombreSolicitante: string;

  @IsString()
  @IsOptional()
  cursoDelSolicitante: string

  @IsString()
  @IsOptional()
  rutDelSolicitante: string

  @IsNumber()
  idLibro: number
}