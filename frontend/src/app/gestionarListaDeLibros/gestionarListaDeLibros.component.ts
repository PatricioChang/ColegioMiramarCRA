import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/Genero';
import { CrearEditarLibroDto } from '../DTO/crearEditarLibro.dto';
import Swal from 'sweetalert2';


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
  public generosLibro: Genero[] = []
  public libro: Libro= new Libro(0,'','',0,'',[],'')
  public agregarLibroBoolean: boolean = false
  public editarLibroBoolean: boolean = false
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
      const valoresFormulario = this.formularioAgregarEditar.value
      const nuevoLibro: CrearEditarLibroDto = {
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

  public restablecerValores(){
    this.agregarLibroBoolean=false
    this.editarLibroBoolean=false
    this.formularioAgregarEditar.reset()
    this.generosLibro=[]
  }

  public iniciarEditarLibro(libro: Libro){
    this.editarLibroBoolean=true
    this.libro=libro
    this.formularioAgregarEditar.setValue({
      titulo: libro.titulo,
      autor: libro.autor,
      anio: libro.anio,
      editorial: libro.editorial,
      ubicacion: libro.ubicacion,
      generos: ''
    })
    this.generosLibro=libro.libro_Generos.map((libro_genero: any) => libro_genero.genero)
  }

  public editarLibro() {
    if(this.formularioAgregarEditar.valid){
      const valoresFormulario = this.formularioAgregarEditar.value
      const editarLibro: CrearEditarLibroDto = {
        titulo: valoresFormulario.titulo,
        autor: valoresFormulario.autor,
        anio: valoresFormulario.anio,
        editorial: valoresFormulario.editorial,
        ubicacion: valoresFormulario.ubicacion,
        libro_Generos: valoresFormulario.generos.map((genero: any) => genero.idGenero)
      }
      this.librosService.editarLibro(this.libro.idLibro, editarLibro).subscribe(response=>{
          this.formularioAgregarEditar.reset()
          this.editarLibroBoolean = false
          this.buscarLibros()
          alert('¡Libro editado exitosamente!')
        },
        error => {
          console.error(error)
          alert('Hubo un error al agregar el libro.')
      })
    }else{
      alert('¡Rellene todos los campos!')
    }
  }

  public eliminarLibro(idLibro: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.librosService.borrarLibro(idLibro).subscribe(() => {
          Swal.fire({
            title: 'Eliminado!',
            text: "El libro ha sido eliminado.",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
          this.buscarLibros()
        })
      }
    })
  }

  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
