import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from '../services/pdf.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-verLibroDigital',
  templateUrl: './verLibroDigital.component.html',
  styleUrls: ['./verLibroDigital.component.css']
})
export class VerLibroDigitalComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pdfService: PdfService,
  ) { }

  ngOnInit() {
    this.idLibro = +this.route.snapshot.paramMap.get('idLibro')!
    this.loadPdf()
  }

  public pdfSrc: SafeResourceUrl | undefined
  public idLibro: number=0

  public loadPdf(): void {
    this.pdfService.buscarPdf(this.idLibro).subscribe(
      (data: Blob) => {
        const url = URL.createObjectURL(data)
        this.pdfSrc=url
      },
      (error) => {
        console.error('Error al cargar el PDF', error)
      }
    )
  }
}
