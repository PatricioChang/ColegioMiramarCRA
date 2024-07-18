import { IsString, IsNotEmpty } from 'class-validator';

export class CrearGeneroDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}