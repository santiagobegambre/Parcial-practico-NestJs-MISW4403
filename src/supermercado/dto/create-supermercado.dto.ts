import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateSupermercadoDto {
  @IsString()
  @MinLength(10, {
    message: 'El nombre debe tener más de 10 caracteres',
  })
  nombre: string;

  @IsNumber()
  longitud: number;

  @IsNumber()
  latitud: number;

  @IsString()
  paginaWeb: string;
}

export class UpdateSupermercadoDto extends CreateSupermercadoDto {}
