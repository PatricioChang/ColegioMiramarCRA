import { IsDate } from 'class-validator';

export class AceptarSolicitudDto {

  @IsDate()
  fechaDeDevolucion: Date;

}