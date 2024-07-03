import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/Usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    ) {}

    async buscarTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
    }

    async buscarPorId(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ id });
    }

    async buscarPorUsuario(usuario: string): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ usuario });
    }
}
