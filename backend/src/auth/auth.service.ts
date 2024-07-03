import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './DTO/login.dto'
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/entities/Usuario.entity';

@Injectable()
export class AuthService { 

    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService
    ){}

    async autenticar(LoginDto: LoginDto): Promise<{ token: string }> {
        const user: Usuario = await this.usuarioService.buscarPorUsuario(LoginDto.user)

        if (!user) {
            throw new ForbiddenException('User is wrong');
        }

        if (user.contraseña !== LoginDto.password) {
            throw new ForbiddenException('Password is wrong');
        }

        const token: string = await this.jwtService.signAsync({ user: user.usuario });
        return { token };
    }
}
