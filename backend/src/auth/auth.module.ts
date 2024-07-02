import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { jwtConstants } from './constants/jwt.constants'

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'}
    })],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
