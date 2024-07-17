import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verLibroDigital',
  templateUrl: './verLibroDigital.component.html',
  styleUrls: ['./verLibroDigital.component.css']
})
export class VerLibroDigitalComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pdfService: PdfService,
    private router: Router
  ) { }

  ngOnInit() {
    this.idLibro = +this.route.snapshot.paramMap.get('idLibro')!
    this.cargarPdf()
  }

  public pdfSrc: SafeResourceUrl | undefined
  public idLibro: number=0

  public cargarPdf(): void {
    this.pdfService.buscarPdf(this.idLibro).subscribe(
      (data: Blob) => {
        const url = URL.createObjectURL(data)
        this.pdfSrc=url
      },
      (error) => {
        if(error.status==404){
          Swal.fire({
            title: '¡El libro no existe!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
          this.router.navigateByUrl('listaDeLibrosDigitales')
        }
      }
    )
  }
}
