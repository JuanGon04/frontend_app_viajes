import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { combineLatest, map, Observable, Subscription, switchMap } from 'rxjs';
import { InfoViajeService } from '../services/info_viaje/info-viaje.service';
import { CommonModule } from '@angular/common';
import { formatearData } from '../utils/format_data';
import { ActualizarHistorialService } from '../services/actualizar-historial/actualizar-historial.service';
import { obtenerImagenClima } from '../utils/image_clima';
import { ClimaTranslate } from '../utils/clima_translate';
import { TranslateModule } from '@ngx-translate/core';
import { EstadoService } from '../services/status/status_data.service';
import { Router } from '@angular/router';
import { IdiomaService } from '../services/status/status_idioma.service';

@Component({
  selector: 'app-info-viaje',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './info-viaje.component.html',
  styleUrls: ['./info-viaje.component.css'],
})
export class InfoViajeComponent implements OnInit, AfterViewChecked {
  public ciudades$!: Observable<any>;
  public clima$!: Observable<any>;
  public currency$!: Observable<any>;
  public historial$!: Observable<any>;
  public id_ciudad!: number;
  private readonly subscription!: Subscription;
  private subscription_idioma!: Subscription;
  public idioma!: string | null;
  public pais!: string;
  public isLoading = false;
  public weather!: { src: string; alt: string };
  public tipo_clima!: string;
  isReady = false;
  public clima_translate!: string;

  @ViewChild('card_clima') card_clima!: ElementRef;

  constructor(
    private readonly service: InfoViajeService,
    private readonly render2: Renderer2,
    private readonly actualizacionService: ActualizarHistorialService,
    private readonly estadoService: EstadoService,
    private readonly router: Router,
    private readonly idiomaService: IdiomaService
  ) {}

  ngOnInit(): void {
    const datos = this.estadoService.getDatos();
    this.obtenerValores(Number(datos.presupuesto), Number(datos.ciudad_id));
    this.subscription_idioma = this.idiomaService.idioma$
    .pipe(
      switchMap((id) => {
        this.idioma = id;
        return this.clima$;
      })
    )
    .subscribe((item) => {
      console.log(item.weather[0].main);
      this.traducirClima(item?.weather[0].main);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isReady && this.card_clima) {
      this.isReady = true;
    }
  }

  obtenerValores(presupuesto: number, id_ciudad: number) {
    if (!id_ciudad) {
      alert('⚠️ Por favor, seleccione una ciudad.');
      return;
    }

    if (!presupuesto) {
      alert('⚠️ Por favor, ingrese un presupuesto.');
      return;
    }

    this.isLoading = true;

    this.clima$ = this.service.getClima(id_ciudad);

    this.currency$ = this.service.getCurrency(id_ciudad, presupuesto);

    if (this.clima$ && this.currency$) {
      combineLatest([this.clima$, this.currency$])
        .pipe(
          map(([data_clima, data_divisa]) =>
            formatearData(data_clima, data_divisa)
          )
        )
        .subscribe({
          next: (data) => {
            this.weather = obtenerImagenClima(data.tipo_clima);
            this.changeBgColor(data.tipo_clima);
            this.traducirClima(data.tipo_clima);
            this.service.guardarHistorial(data).subscribe({
              next: () => {
                this.isLoading = false;
                this.actualizacionService.emitirActualizacion();
              },
              error: (error) => {
                console.error('Error al guardar el historial:', error);
                this.isLoading = false;
              },
            });
          },
          error: (error) => {
            console.error('Error en la combinación de datos:', error);
            this.isLoading = false;
          },
        });
    }
  }

  changeBgColor(tipo_clima: string) {
    setTimeout(() => {
      if (this.isReady) {
        if (!this.card_clima.nativeElement) return;

        let className = 'bg-temp-atmosfera';
        if (tipo_clima === 'Thunderstorm') className = 'bg-tormenta';
        else if (tipo_clima === 'Drizzle') className = 'bg-llovizna';
        else if (tipo_clima === 'Rain') className = 'bg-lluvia';
        else if (tipo_clima === 'Snow') className = 'bg-nieve';
        else if (tipo_clima === 'Clear') className = 'bg-soleado';
        else if (tipo_clima === 'Clouds') className = 'bg-nublado';

        this.render2.addClass(this.card_clima.nativeElement, className);
      }
    }, 5000);
  }

  traducirClima(descipcion_clima: string) {
    if (descipcion_clima !== undefined) {
      this.clima_translate = ClimaTranslate(descipcion_clima, this.idioma); // Retornar la traducción en lugar de asignarla a una variable global
    }
  }

  volverAlInicio() {
    this.router.navigate(['/']); // Redirige a la página inicial
  }
}
