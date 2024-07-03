import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { typeOrmConfig } from './typeorm/typeorm.service';
import { ListaDeLibrosModule } from './listaDeLibros/listadelibros.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsuarioModule,
    ListaDeLibrosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
