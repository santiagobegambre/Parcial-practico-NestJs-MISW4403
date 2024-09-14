import { IsString, IsIn, IsNumber } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsIn(['Argentina', 'Ecuador', 'Paraguay'], {
    message: 'El país debe ser Argentina, Ecuador o Paraguay',
  })
  pais: string;

  @IsNumber()
  numHabitantes: number;
}

export class UpdateCiudadDto extends CreateCiudadDto {}
