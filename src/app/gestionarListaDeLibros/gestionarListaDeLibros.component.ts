import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GeneroService } from '../services/genero.service';
import { Genero } from '../models/Genero';
import { CrearEditarLibroDto } from '../DTO/crearEditarLibro.dto';
import Swal from 'sweetalert2';
import { PdfService } from '../services/pdf.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CrearGeneroDto } from '../DTO/crearGenero.dto';

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
    private pdfService: PdfService,
    private formBuilder: FormBuilder
  ) { 
    this.formularioAgregarEditar = formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: ['', Validators.required],
      editorial: ['', Validators.required],
      ubicacion: ['', Validators.required],
      generos: [[]]
    })
    this.formularioAgregarGenero= formBuilder.group({
      nombre: ['', Validators.required]
    })
    this.formularioEliminarGenero= formBuilder.group({
      nombre: ['', Validators.required]
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
      searchPlaceholderText: 'Buscar género',
      noDataAvailablePlaceholderText: 'No hay géneros disponibles'
    }
    this.buscarFormulario.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(titulo => {
        this.filtrarLibros(titulo)
      })
  }

  public libros: Libro[] = []
  public generos: Genero[] = []
  public generosLibro: Genero[] = []
  public libro: Libro = new Libro(0, '', '', 0, '', [], '')
  public agregarLibroBoolean: boolean = false
  public editarLibroBoolean: boolean = false
  public agregarGeneroBoolean: boolean = false
  public eliminarGeneroBoolean: boolean = false
  public pdfBoolean: boolean = false
  public formularioAgregarEditar: FormGroup
  public formularioAgregarGenero: FormGroup
  public formularioEliminarGenero: FormGroup
  public buscarFormulario: FormControl = new FormControl()
  public dropdownSettings: IDropdownSettings = {}
  selectedFile: File | null = null

  public onFileSelected(event: any): void {
    const file: File = event.target.files[0]
    if (file) {
      this.selectedFile = file
    }
  }

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

  public agregarLibro() {
    if (this.formularioAgregarEditar.valid) {
      const valoresFormulario = this.formularioAgregarEditar.value
      
      const nuevoLibro: CrearEditarLibroDto = {
        titulo: valoresFormulario.titulo,
        autor: valoresFormulario.autor,
        anio: valoresFormulario.anio,
        editorial: valoresFormulario.editorial,
        ubicacion: valoresFormulario.ubicacion,
        libro_Generos: valoresFormulario.generos.map((genero: any) => ({
          idGenero: genero.idGenero,
          nombre: genero.nombre
        }))
      }
  
      this.librosService.agregarLibro(nuevoLibro).subscribe(
        response => {
          this.restablecerValores()
          this.buscarLibros()
          Swal.fire({
            title: '¡Libro agregado exitosamente!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        },
        error => {
          console.error(error)
          Swal.fire({
            title: '¡Hubo un error al agregar el libro!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        }
      )
    } else {
      Swal.fire({
        title: '¡Rellene todos los campos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  }

  public restablecerValores(){
    this.agregarLibroBoolean=false
    this.editarLibroBoolean=false
    this.agregarGeneroBoolean=false
    this.eliminarGeneroBoolean=false
    this.pdfBoolean=false
    this.formularioAgregarEditar.reset()
    this.formularioAgregarGenero.reset()
    this.formularioEliminarGenero.reset()
    this.formularioEliminarGenero.setValue({nombre: ''})
    this.generosLibro=[]
  }

  public iniciarEditarLibro(libro: Libro, tipoEditar: string){
    if(tipoEditar=='editar'){
      this.editarLibroBoolean=true
      this.pdfBoolean=true
      this.libro=libro
      this.formularioAgregarEditar.setValue({
        titulo: libro.titulo,
        autor: libro.autor,
        anio: libro.anio,
        editorial: libro.editorial,
        ubicacion: libro.ubicacion,
        generos: libro.libro_Generos.map(genero => genero.genero.idGenero)
      })
      this.generosLibro=libro.libro_Generos.map(genero => genero.genero)
    } else if(tipoEditar=='pdf'){
      this.pdfService.buscarPdf(libro.idLibro).subscribe(response=>{
        if(response){
          Swal.fire({
            title: '¡El libro ya tiene PDF!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
          this.pdfBoolean=true
          this.restablecerValores()
        }
      }, error =>{
        if(error.status === 404){
          this.editarLibroBoolean=true
          this.libro=libro
          this.formularioAgregarEditar.setValue({
            titulo: libro.titulo,
            autor: libro.autor,
            anio: libro.anio,
            editorial: libro.editorial,
            ubicacion: libro.ubicacion,
            generos: libro.libro_Generos.map(genero => genero.genero)
          })
          this.generosLibro=libro.libro_Generos.map(genero => genero.genero)
        }
      })
    }
  }

  public editarLibro() {
    if(this.formularioAgregarEditar.valid){
      const formData = new FormData()
      formData.append('titulo', this.formularioAgregarEditar.get('titulo')?.value)
      formData.append('autor', this.formularioAgregarEditar.get('autor')?.value)
      formData.append('ubicacion', this.formularioAgregarEditar.get('ubicacion')?.value)
      formData.append('anio', this.formularioAgregarEditar.get('anio')?.value)
      formData.append('editorial', this.formularioAgregarEditar.get('editorial')?.value)
      const generosJson = JSON.stringify(this.formularioAgregarEditar.get('generos')?.value)
      formData.append('libro_Generos', generosJson)
      if (this.selectedFile) {
        formData.append('pdf', this.selectedFile)
      }
      this.librosService.editarLibro(this.libro.idLibro, formData).subscribe(
        response => {
          this.restablecerValores()
          this.buscarLibros()
          if(this.selectedFile){
            Swal.fire({
              title: '¡Se agrego el PDF al libro!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }else{
            Swal.fire({
              title: '¡Libro edito exitosamente!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
          }
        },
        error => {
          console.error(error)
          Swal.fire({
            title: '¡Hubo un error al editar el libro!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        }
      )
    } else {
      Swal.fire({
        title: '¡Rellene todos los campos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
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

  public filtrarLibros(titulo: string): void {
    if (titulo) {
      this.librosService.buscarLibrosDisponibles().subscribe(response => {
        this.libros = response.filter(libro =>
          libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        )
      })
    } else {
      this.buscarLibros()
    }
  }

  public agregarGenero(): void{
    if(this.formularioAgregarGenero.valid){
       const nuevoGenero: CrearGeneroDto = {
        nombre: this.formularioAgregarGenero.get('nombre')?.value
      }
      this.generoService.agregarGenero(nuevoGenero).subscribe(response => {
        this.restablecerValores()
        this.buscarLibros()
        this.buscarGeneros()
        Swal.fire({
          title: '¡Género agregado exitosamente!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
      },
      error => {
        console.error(error)
        Swal.fire({
          title: '¡Hubo un error al agregar el género!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })
      })
    }else{
      Swal.fire({
        title: '¡Rellene todos los campos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  }

  public eliminarGenero(): void{
    if(this.formularioEliminarGenero.valid){
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
          const idGenero= this.generos.find(genero=>
            genero.nombre== this.formularioEliminarGenero.get('nombre')!.value
          )!.idGenero
          this.generoService.borrarGenero(idGenero).subscribe(() => {
            Swal.fire({
              title: 'Eliminado!',
              text: "El género ha sido eliminado.",
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            })
            this.restablecerValores()
            this.buscarLibros()
            this.buscarGeneros()
          })
        }
      })
    }else{
      Swal.fire({
        title: '¡Rellene todos los campos!',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      })
    }
  }

  public logOut(): void{
    this.loginService.logOut()
  }
}
