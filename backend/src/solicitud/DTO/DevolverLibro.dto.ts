import { IsString } from 'class-validator';

export class DevolverLibroDto {

  @IsString()
  observacion: string;

}