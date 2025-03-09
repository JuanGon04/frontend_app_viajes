import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { InfoViajeService } from '../services/info_viaje/info-viaje.service';
import { CommonModule } from '@angular/common';
import { formatearData } from '../utils/format_data';
import { ActualizarHistorialService } from '../services/actualizar-historial/actualizar-historial.service';
import { obtenerImagenClima } from '../utils/image_clima';
import { ClimaTranslate } from '../utils/clima_translate';
import { TranslateModule } from '@ngx-translate/core';

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
  public presupuesto!: number;
  public ciudad!: string;
  public pais!: string;
  public isLoading = false;
  public weather!: { src: string; alt: string };
  public tipo_clima!:string;
  isReady = false;
  public clima_translate!: string;

  @ViewChild('card_clima') card_clima!: ElementRef;
  @Input('idioma') idioma!: string;
 

  constructor(
    private readonly service: InfoViajeService,
    private readonly render2: Renderer2,
    private readonly actualizacionService: ActualizarHistorialService
  ) {}

  ngOnInit(): void {
    this.ciudades$ = this.service.getCiudades();
  }

  ngAfterViewChecked(): void {
    if (!this.isReady && this.card_clima) {
      this.isReady = true;
    }
  }

   ngOnChanges(changes: SimpleChanges): void {
    
      if (changes['idioma'] && this.idioma && this.clima$) {
        this.clima$.pipe(map((item)=>this.traducirClima(item.weather[0].main))).subscribe();
      }
    }

  obtenerValores(presupuesto: string, id_ciudad: string) {
    
    if (!id_ciudad) {
      alert('⚠️ Por favor, seleccione una ciudad.');
      return;
    }

    if (!presupuesto) {
      alert('⚠️ Por favor, ingrese un presupuesto.');
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
    if(this.isReady){
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
  },5000);
  }

  traducirClima(descipcion_clima:string){
      if (descipcion_clima !== undefined) {
        this.clima_translate=ClimaTranslate(descipcion_clima, this.idioma); // Retornar la traducción en lugar de asignarla a una variable global
    }
  }
  }
