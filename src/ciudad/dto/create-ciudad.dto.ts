import { IsString, IsIn, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsIn(['Argentina', 'Ecuador', 'Paraguay'], {
    message: 'El país debe ser Argentina, Ecuador o Paraguay',
  })
  readonly pais: string;

  @IsNumber()
  @IsPositive()
  readonly numHabitantes: number;
}

export class UpdateCiudadDto extends CreateCiudadDto {}
