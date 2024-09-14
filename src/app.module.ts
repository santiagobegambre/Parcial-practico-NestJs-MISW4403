import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermercadoModule } from './supermercado/supermercado.module';
import { CiudadSupermercadoModule } from './ciudad-supermercado/ciudad-supermercado.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CiudadModule,
    SupermercadoModule,
    CiudadSupermercadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
