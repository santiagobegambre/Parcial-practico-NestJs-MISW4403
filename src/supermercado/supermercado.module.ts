import { Module } from '@nestjs/common';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoController } from './supermercado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermercado } from './supermercado.entity/supermercado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supermercado])],
  providers: [SupermercadoService],
  controllers: [SupermercadoController],
  exports: [TypeOrmModule],
})
export class SupermercadoModule {}
