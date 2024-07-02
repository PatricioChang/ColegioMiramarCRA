import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './DTO/login.dto'

@Injectable()
export class AuthService { 

    constructor(
        private readonly jwtService: JwtService
    ){}

    private readonly users=[
        {user: 'usuarioCRA', password: 'admin'},
        {user: 'usuario2CRA', password: 'admin'}
    ]

    async autenticar(LoginDto: LoginDto): Promise<{ token: string }> {
        const user = this.users.find(u => u.user === LoginDto.user);

        if (!user) {
            throw new ForbiddenException('User is wrong');
        }

        if (user.password !== LoginDto.password) {
            throw new ForbiddenException('Password is wrong');
        }

        const token: string = await this.jwtService.signAsync({ user: LoginDto.user });
        return { token };
    }
}
