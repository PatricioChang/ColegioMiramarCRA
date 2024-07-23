import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-verLibroDigital',
  templateUrl: './verLibroDigital.component.html',
  styleUrls: ['./verLibroDigital.component.css']
})
export class VerLibroDigitalComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pdfService: PdfService,
    private libroService: LibrosService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.idLibro = +this.route.snapshot.paramMap.get('idLibro')!
    this.cargarPdf()
  }

  public pdfSrc: SafeResourceUrl | undefined
  public iframeSrc: SafeResourceUrl | undefined
  public esBlob: boolean = false
  public idLibro: number = 0

  public cargarPdf(): void {
    this.libroService.buscarLibro(this.idLibro).subscribe(response => {
      if (response.url) {
        this.esBlob = false
        this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(response.url)
      } else {
        this.pdfService.buscarPdf(this.idLibro).subscribe(
          (data: Blob) => {
            this.esBlob = true
            this.pdfSrc = URL.createObjectURL(data)
          },
          (error) => {
            if (error.status == 404) {
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
    })
  }
}