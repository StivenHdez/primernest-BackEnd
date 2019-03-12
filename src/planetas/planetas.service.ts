import { Injectable} from '@nestjs/common';
import { Planeta } from './entities/planeta.entity';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CreatePlanetaDto } from './dto/create-planeta-dto';
import { promises } from 'fs';

@Injectable()
export class PlanetasService {

  constructor(

    @InjectRepository(Planeta)
    private readonly planetaRepository: Repository<Planeta>,
  ){}

   async getAllPlanetas(): Promise<Planeta[]>{
        return await this.planetaRepository.find();
    }

    
    async OnePlaneta(nombreplaneta:string):Promise<any>{
      return await this.planetaRepository.findOne(nombreplaneta);
    }

    async createPlaneta (planetaNuevo:CreatePlanetaDto): Promise<Planeta>{
      const nuevo = new Planeta();
      nuevo.planeta = planetaNuevo.planeta;
      nuevo.nick = planetaNuevo.nick;

      return this.planetaRepository.save(nuevo);
    }

    async updatePlaneta(idPlaneta: number, planetaActualizar: CreatePlanetaDto): Promise<Planeta>{
      const planetaUpdate = await this.planetaRepository.findOne(idPlaneta);
      planetaUpdate.nick = planetaActualizar.nick;
      planetaUpdate.planeta = planetaActualizar.planeta;

      return await this.planetaRepository.save(planetaUpdate);
    }

    async deletePlaneta(idPlaneta:number):Promise<any>{
      return await this.planetaRepository.delete(idPlaneta);
    }

    // getPlaneta(id:string){
    //     return {
    //         id,
    //         name:`tarea ${id}`,
    //     };

    // }

}
