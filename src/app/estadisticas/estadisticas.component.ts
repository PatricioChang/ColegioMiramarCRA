import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, Color, LabelItem } from 'chart.js';
import { LoginService } from '../services/login.service';
import { LibrosService } from '../services/libros.service';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private librosService: LibrosService,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    const añoActual = new Date().getFullYear()
    let añosUnicos: Set<number> = new Set()
  
    this.solicitudService.buscarSolicitudes().subscribe(response => {
      for (let solicitud of response) {
        let anio = new Date(solicitud.fechaDeSolicitud).getFullYear()
        añosUnicos.add(anio)
      }
      this.anios = Array.from(añosUnicos).sort((a, b) => b - a)

      if (!this.anios.includes(añoActual)) {
        this.anios.unshift(añoActual)
      }
      this.cargarDatos(this.añoSeleccionado)
    })
  }

  public añoSeleccionado: number = new Date().getFullYear()
  public anios: number[] = []
  public totalLibros: number = 0
  public librosPrestados: number = 0
  public solicitudesPorMes: { datasets: ChartDataset[], labels:  string[] } = { datasets: [], labels: [] }
  public generosMasSolicitados: { datasets: ChartDataset[], labels: string[] } = { datasets: [], labels: [] }
  public usuariosActivos: number = 0
  
  public cargarDatos(anio: number): void {
    this.librosService.buscarLibros().subscribe(response => {
      this.totalLibros = response.length
    })
    this.solicitudService.buscarSolicitudesPorDevolver().subscribe(response => {
      this.librosPrestados = response.filter(solicitud => solicitud.fechaDeDevolucion).length
    })

    this.solicitudService.buscarSolicitudes().subscribe(response => {
      const solicitudesPorMes = Array(12).fill(0)
      const generosConteo: { [key: string]: number } = {}

      for (let solicitud of response) {
        const fechaSolicitud = new Date(solicitud.fechaDeSolicitud)
        const solicitudAño = fechaSolicitud.getFullYear()
        const solicitudMes = fechaSolicitud.getMonth()

        if (solicitudAño === anio) {
          solicitudesPorMes[solicitudMes]++
          
          for (let genero of solicitud.libro.libro_Generos) {
            const generoNombre = genero.genero.nombre
            if (!generosConteo[generoNombre]) {
              generosConteo[generoNombre] = 0
            }
            generosConteo[generoNombre]++
          }
        }
      }

      const ordenGeneros = Object.entries(generosConteo)
        .sort((a, b) => b[1] - a[1]) 
        .slice(0, 5)

      let otrosConteo = 0
      for (let i = 5; i < Object.keys(generosConteo).length; i++) {
        otrosConteo += Object.values(generosConteo)[i]
      }

      this.generosMasSolicitados.labels = ordenGeneros.map(entry => entry[0]).concat(['Otros'])
      this.generosMasSolicitados.datasets = [
        { data: ordenGeneros.map(entry => entry[1]).concat([otrosConteo]), label: 'Géneros' }
      ]

      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

      this.solicitudesPorMes.labels = meses
      this.solicitudesPorMes.datasets = [
        { data: solicitudesPorMes, label: 'Solicitudes' }
      ]
    })
  }

  public alCambiarDeAnio(evento: Event): void {
    const elementoSeleccionado = evento.target as HTMLSelectElement
    const añoSeleccionado = parseInt(elementoSeleccionado.value, 10)
    this.añoSeleccionado = añoSeleccionado
    this.cargarDatos(añoSeleccionado)
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    backgroundColor: 'rgba(63,81,181,0.3)'
  }
  public barChartType: ChartType = 'bar'
  public barChartLegend = true
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  }
  public pieChartType: ChartType = 'pie'
  public pieChartLegend = true

  public logOut(): void{
    this.loginService.logOut()
  }
}
