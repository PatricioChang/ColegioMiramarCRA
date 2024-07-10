import { IsString, IsNumber, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CrearEditarLibroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsNumber()
  anio: number;

  @IsString()
  @IsNotEmpty()
  editorial: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;


  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  libro_Generos: number[]
}