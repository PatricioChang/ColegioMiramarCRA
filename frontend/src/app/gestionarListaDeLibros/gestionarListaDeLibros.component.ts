import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/Genero';
import { crearLibroDto } from '../DTO/crearLibro.dto';


@Component({
  selector: 'app-gestionarListaDeLibros',
  templateUrl: './gestionarListaDeLibros.component.html',
  styleUrls: ['./gestionarListaDeLibros.component.css']
})
export class GestionarListaDeLibrosComponent implements OnInit {

  constructor(
    private librosService: LibrosService,
    private loginService: LoginService,
    private generoService: GeneroService,
    private formBuilder: FormBuilder
  ) { 
    this.formularioAgregarEditar= formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: ['', Validators.required],
      editorial: ['', Validators.required],
      ubicacion: ['', Validators.required],
      generos: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.buscarLibros()
    this.buscarGeneros()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'idGenero',
      textField: 'nombre',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 20,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar genero',
      noDataAvailablePlaceholderText: 'No hay generos disponibles'
    }
  }

  public libros: Libro[] = []
  public librosReservados: Libro[]=[]
  public generos: Genero[]=[]
  public agregarLibroBoolean: boolean = false
  public formularioAgregarEditar: FormGroup
  public dropdownSettings: IDropdownSettings = {}

  public buscarLibros() {
    this.librosService.buscarLibros().subscribe(response => {
      this.libros = response
    })
  }

  public buscarGeneros(){
    this.generoService.buscarGeneros().subscribe(response=>{
      this.generos=response
    })
  }

  public agregarLibro(){
    if(this.formularioAgregarEditar.valid){
      const valoresFormulario = this.formularioAgregarEditar.value;
      const nuevoLibro: crearLibroDto = {
        titulo: valoresFormulario.titulo,
        autor: valoresFormulario.autor,
        anio: valoresFormulario.anio,
        editorial: valoresFormulario.editorial,
        ubicacion: valoresFormulario.ubicacion,
        libro_Generos: valoresFormulario.generos.map((genero: any) => genero.idGenero)
      }
      this.librosService.agregarLibro(nuevoLibro).subscribe(
        response => {
          this.formularioAgregarEditar.reset()
          this.agregarLibroBoolean = false
          this.buscarLibros()
          alert('¡Libro agregado exitosamente!')
        },
        error => {
          console.error(error)
          alert('Hubo un error al agregar el libro.')
        }
      )
    }else{
      alert('¡Rellene todos los campos!')
    }
  }

  public editarLibro() {
  }

  public eliminarLibro(idLibro: number) {
    this.librosService.borrarLibro(idLibro).subscribe(() => {
      alert('¡Libro eliminado!')
      this.buscarLibros()
    })
  }

  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
