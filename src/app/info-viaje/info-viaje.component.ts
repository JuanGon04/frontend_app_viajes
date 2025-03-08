import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { InfoViajeService } from '../services/info_viaje/info-viaje.service';
import { CommonModule } from '@angular/common';
import { formatearData } from '../utils/format_data';
import { ActualizarHistorialService } from '../services/actualizar-historial/actualizar-historial.service';
import { obtenerImagenClima } from '../utils/image_clima';

@Component({
  selector: 'app-info-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-viaje.component.html',
  styleUrls: ['./info-viaje.component.css'],
})
export class InfoViajeComponent implements OnInit {
  public ciudades$!: Observable<any>;
  public clima$!: Observable<any>;
  public currency$!: Observable<any>;
  public historial$!: Observable<any>;
  public id_ciudad!: number;
  public presupuesto!: number;
  public ciudad!: string;
  public pais!: string;
  public isLoading = false;
  public weather!: {src: string; alt: string};

  constructor(private readonly service: InfoViajeService, private readonly actualizacionService: ActualizarHistorialService) {}

  ngOnInit(): void {
    this.ciudades$ = this.service.getCiudades();
  }

  obtenerValores(presupuesto: string, id_ciudad: string) {
    if (!presupuesto) {
      alert('⚠️ Por favor, ingrese un presupuesto.');
      return;
    }

    if (!id_ciudad) {
      alert('⚠️ Por favor, seleccione una ciudad.');
      return;
    }

    this.isLoading = true;

    this.clima$ = this.service.getClima(Number(id_ciudad));

    this.currency$ = this.service.getCurrency(
      Number(id_ciudad),
      Number(presupuesto)
    );

    if (this.clima$ && this.currency$) {
      combineLatest([this.clima$, this.currency$])
        .pipe(
          map(([data_clima, data_divisa]) => formatearData(data_clima, data_divisa)
          )
        )
        .subscribe({
          next: (data) => {
            console.log(data);
            this.weather=obtenerImagenClima(data.tipo_clima);
            this.service.guardarHistorial(data).subscribe({
              next: () => {
                this.isLoading = false;
                this.actualizacionService.emitirActualizacion();
              },
              error: (error) => {
                console.error('Error al guardar el historial:', error);
                this.isLoading = false;
              }
            });
          },
          error: (error) => {
            console.error('Error en la combinación de datos:', error);
            this.isLoading = false;
          }
        });
  }
  }
}
