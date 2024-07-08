/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListaDeLibrosDigitalesComponent } from './listaDeLibrosDigitales.component';

describe('ListaDeLibrosDigitalesComponent', () => {
  let component: ListaDeLibrosDigitalesComponent;
  let fixture: ComponentFixture<ListaDeLibrosDigitalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeLibrosDigitalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeLibrosDigitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
