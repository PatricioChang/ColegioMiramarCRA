import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/Libro';
import { SolicitudService } from '../services/solicitud.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadisticasUsuario',
  templateUrl: './estadisticasUsuario.component.html',
  styleUrls: ['./estadisticasUsuario.component.css']
})
export class EstadisticasUsuarioComponent implements OnInit {

  constructor(
    private solicitudService: SolicitudService
  ) { }

  ngOnInit() {
    this.cargarDatos()
  }

  public librosMasSolicitados: { datasets: ChartDataset[], labels: string[] } = { datasets: [], labels: [] }
  public smallPieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartType: ChartType = 'pie'
  public pieChartLegend = true

  public cargarDatos(){
    const mesActual= new Date().getMonth()+1
    console.log(mesActual)
    this.solicitudService.buscarSolicitudes().subscribe(response=>{
      const librosConteo: { [key: string]: number } = {}
      for(let solicitud of response){
        console.log(solicitud)
        const fechaSolicitud= new Date(solicitud.fechaDeSolicitud)
        const solicitudMes= fechaSolicitud.getMonth()+1
        console.log(solicitudMes)

        if(solicitudMes===mesActual){
          const libroTitulo = solicitud.libro.titulo
          if (!librosConteo[libroTitulo]) {
            librosConteo[libroTitulo] = 0
          }
          librosConteo[libroTitulo]++
        }
      }

      console.log(librosConteo)

      const ordenLibros = Object.entries(librosConteo)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

      let otrosLibrosConteo = 0
      for (let i = 5; i < Object.keys(librosConteo).length; i++) {
        otrosLibrosConteo += Object.values(librosConteo)[i]
      }

      this.librosMasSolicitados.labels = ordenLibros.map(entry => entry[0]).concat(['Otros'])
      this.librosMasSolicitados.datasets = [
        { data: ordenLibros.map(entry => entry[1]).concat([otrosLibrosConteo]), label: 'Libros' }
      ]
    })
  }
}
