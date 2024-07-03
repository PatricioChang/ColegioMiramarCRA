import { Body, Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from 'src/entities/Usuario.entity';

@Controller('usuario')
export class UsuarioController { 
  constructor(private readonly userService: UsuarioService) {}

  @Get()
  async buscarTodos(): Promise<Usuario[]> {
    return this.userService.buscarTodos();
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<Usuario> {
    return this.userService.buscarPorId(+id);
  }

  @Get(':usuario')
  async buscarPorUsuario(@Param('usuario') usuario: string): Promise<Usuario> {
    return this.userService.buscarPorUsuario(usuario);
  }
}
