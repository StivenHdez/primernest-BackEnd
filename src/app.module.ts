import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanetasController } from './planetas/planetas.controller';
import { PlanetasService } from './planetas/planetas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planeta } from './planetas/entities/planeta.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'planetas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Planeta])
  ],
  controllers: [AppController, PlanetasController],
  providers: [AppService, PlanetasService],
})
export class AppModule {}
