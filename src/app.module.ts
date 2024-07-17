import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { typeOrmConfig } from './typeorm/typeorm.service';
import { LibroModule } from './libro/libro.module';
import { PdfModule } from './pdf/pdf.module';
import { GeneroModule } from './genero/genero.module';
import { SolicitudModule } from './solicitud/solicitud.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsuarioModule,
    LibroModule,
    PdfModule,
    GeneroModule,
    SolicitudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
