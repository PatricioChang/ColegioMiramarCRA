import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { typeOrmConfig } from './typeorm/typeorm.service';
import { LibroModule } from './libro/libro.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsuarioModule,
    LibroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
