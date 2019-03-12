import { Controller, Get, Param, Post, Body ,Put, Delete,Res,HttpStatus } from '@nestjs/common';
import { PlanetasService } from './../planetas/planetas.service';
import { CreatePlanetaDto } from './dto/create-planeta-dto';
import { response } from 'express';
import { Planeta } from './entities/planeta.entity';
// import { create } from 'domain';

@Controller('planetas')
export class PlanetasController {

    constructor(
        private planetaServices: PlanetasService
    ){

    }

    @Post()
    
    create(@Body() CreatePlanetaDto: CreatePlanetaDto ,@Res() response){
         this.planetaServices.createPlaneta(CreatePlanetaDto).then( planeta=>{
            response.status(HttpStatus.CREATED).json(planeta);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json(planeta=>'Error en la creacion del planeta');
        });
    }

    @Get()
    getAllPlanetas(@Res() response){
        // return this.planetas.getAllPlanetas();
        this.planetaServices.getAllPlanetas().then(planetasList=>{
            response.status(HttpStatus.OK).json(planetasList);
        }).catch(()=>{
            response.status(HttpStatus.OK).json({planeta :'Error en la obtencion del planeta' });
        });
    }

    @Get(':nombreplaneta')
    OnePlanetas( @Res() response, @Param('nombreplaneta') nombreplaneta){
        // return this.planetas.getAllPlanetas();
        this.planetaServices.OnePlaneta(nombreplaneta).then(planetasList=>{
            response.status(HttpStatus.OK).json(planetasList);
        }).catch(()=>{
            response.status(HttpStatus.OK).json({planeta :'Error en la obtencion del planeta' });
        });
    }

    // @Get(':id')
    // findPlaneta(@Param('id')id){
    //     return this.planetaServices.getPlaneta(id);

    // }

    @Put(':id')
    update(@Body() updatePlanetaDto : CreatePlanetaDto, @Res() response, @Param('id') idPlaneta){
        this.planetaServices.updatePlaneta(idPlaneta,updatePlanetaDto).then(Planeta=>{
            response.status(HttpStatus.OK).json(Planeta); 
        }).catch(()=>{
            response.status(HttpStatus.OK).json({planeta :'Error en la edicion del planeta' });
        });
    }

    @Delete(':id')
    deletePlanetas(@Res() response, @Param('id') idPlaneta){
        this.planetaServices.deletePlaneta(idPlaneta).then(res=>{
            response.status(HttpStatus.OK).json(res); 
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({planeta:'Error en la eliminacion del planeta'})
        });
    }

}