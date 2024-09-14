import { Module } from '@nestjs/common';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from '../ciudad/ciudad.entity/ciudad.entity';
import { Supermercado } from '../supermercado/supermercado.entity/supermercado.entity';
import { CiudadModule } from '../ciudad/ciudad.module';
import { SupermercadoModule } from '../supermercado/supermercado.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ciudad, Supermercado]),
    CiudadModule,
    SupermercadoModule,
  ],
  providers: [CiudadSupermercadoService],
  controllers: [CiudadSupermercadoController],
})
export class CiudadSupermercadoModule {}
