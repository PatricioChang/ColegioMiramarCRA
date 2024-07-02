import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController { 
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() LoginDto: LoginDto): Promise<{ token: string }>{
        return this.authService.autenticar(LoginDto)
    }   
}
