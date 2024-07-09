import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from 'src/entities/Genero.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Genero])],
    controllers: [GeneroController,],
    providers: [GeneroService,],
})
export class GeneroModule { }
