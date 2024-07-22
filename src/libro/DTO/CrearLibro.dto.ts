import { IsString, IsNumber, IsArray, ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional()
  url: string;

  libro_Generos: { idGenero: number, nombre: string }[];
}