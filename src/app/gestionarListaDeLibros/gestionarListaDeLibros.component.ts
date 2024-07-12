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
import { PdfService } from '../services/pdf.service';

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
      generos: [[]]  // Inicializado como un array vacío
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
  }

  public libros: Libro[] = []
  public generos: Genero[] = []
  public generosLibro: Genero[] = []
  public libro: Libro = new Libro(0, '', '', 0, '', [], '')
  public agregarLibroBoolean: boolean = false
  public editarLibroBoolean: boolean = false
  public pdfBoolean: boolean = false
  public formularioAgregarEditar: FormGroup
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
          alert('¡Libro agregado exitosamente!')
        },
        error => {
          console.error(error)
          alert('Hubo un error al agregar el libro.')
        }
      )
    } else {
      alert('¡Rellene todos los campos!')
    }
  }

  public restablecerValores(){
    this.agregarLibroBoolean=false
    this.editarLibroBoolean=false
    this.pdfBoolean=false
    this.formularioAgregarEditar.reset()
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
          alert('tiene pdf')
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
            alert('¡Se agrego el PDF al libro!')
          }else{
            alert('¡Libro editado exitosamente!')
          }
        },
        error => {
          console.error(error)
          alert('Hubo un error al editar el libro.')
        }
      )
    } else {
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
