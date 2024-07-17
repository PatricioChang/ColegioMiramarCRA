import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/DTO/Login.dto'
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/entities/Usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService { 

    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService
    ){}

    async autenticar(LoginDto: LoginDto): Promise<{ token: string }> {
        const user: Usuario = await this.usuarioService.buscarPorUsuario(LoginDto.user)

        if (!user) {
            throw new ForbiddenException('Usuario incorrecto');
        }

        const compararContraseña= await bcrypt.compare(LoginDto.password, user.contraseña)

        if (!compararContraseña) {
            throw new ForbiddenException('Contraseña incorrecta');
        }

        const token: string = await this.jwtService.signAsync({ user: user.usuario });
        return { token };
    }
}
