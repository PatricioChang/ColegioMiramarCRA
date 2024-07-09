import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { Libro } from '../models/Libro';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-gestionarListaDeLibros',
  templateUrl: './gestionarListaDeLibros.component.html',
  styleUrls: ['./gestionarListaDeLibros.component.css']
})
export class GestionarListaDeLibrosComponent implements OnInit {

  constructor(
    private librosService: LibrosService,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { 
    this.formularioAgregarEditar= formBuilder.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anio: ['', Validators.required],
      editorial: ['', Validators.required],
      generos: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.buscarLibros()
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar genero',
      noDataAvailablePlaceholderText: 'No hay generos disponibles'
    };
  }

  public libros: Libro[] = []
  public librosReservados: Libro[]=[]
  public agregarLibroBoolean: boolean = false
  public formularioAgregarEditar: FormGroup
  dropdownList: {item_id: number, item_text: string}[] = [];
  dropdownSettings: IDropdownSettings = {};

  public buscarLibros() {
    this.librosService.buscarLibros().subscribe(response => {
      this.libros = response;
    })
  }

  public agregarLibro(){
  }

  public editarLibro() {
  }

  public eliminarLibro(idLibro: number) {
    this.librosService.deleteLibro(idLibro).subscribe(() => {
      this.buscarLibros();
    });
  }

  public logOut(): void{
    this.loginService.logOut()
    alert('¡Se ha cerrado la sesión!')
  }
}
