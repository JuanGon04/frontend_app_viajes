import { Observable, Subscription } from 'rxjs';
import { ActualizarHistorialService } from '../services/actualizar-historial/actualizar-historial.service';
import { InfoViajeService } from '../services/info_viaje/info-viaje.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { obtenerEmojiClima } from '../utils/emoji_clima';
import { ClimaTranslate } from '../utils/clima_translate';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EstadoService } from '../services/status/status_data.service';
import { FormsModule } from '@angular/forms';
import { IdiomaService } from '../services/status/status_idioma.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit, AfterViewChecked {
  public historial$!: Observable<any>;
  public ciudades$!: Observable<any>;
  private subscription!: Subscription;
  isLoading = true;
  isReady = true;
  public clima_translate: string[] = [];
  public idioma!: string | null;
  public weather!: { src: string; alt: string };
  @ViewChildren('item_historial') item_historial!: QueryList<ElementRef>;
  @ViewChildren('price') price!: QueryList<ElementRef>;

  constructor(
    private readonly service: InfoViajeService,
    private readonly actualizacionService: ActualizarHistorialService,
    private readonly render2: Renderer2,
    private readonly estadoService: EstadoService,
    private readonly router: Router,
    private readonly idiomaService: IdiomaService
  ) {}

  ngOnInit(): void {
    this.ciudades$ = this.service.getCiudades();
    this.obtenerDatos();
    this.subscription = this.actualizacionService.actualizar$.subscribe(() => {
      this.isLoading = true;
      this.obtenerDatos();
      this.obtenerItem();
      this.isReady = true;
    });
    

    this.subscription = this.idiomaService.idioma$.subscribe((id) => {
      this.idioma = id;
      this.historial$.subscribe((historial) => {
        historial.forEach((item: any, index: number) => {
          this.clima_translate[index] = this.traducirClima(item?.tipo_clima);
        });
      });
    });
  }

  ngAfterViewChecked(): void {
    this.obtenerItem();
  }

  obtenerItem() {
    if (!this.isReady) return;

    this.historial$.subscribe((historial) => {
      historial.forEach((item: any, index: number) => {
        const temperatura = item?.temperatura;
        this.clima_translate[index] = this.traducirClima(item?.tipo_clima);
        if (temperatura !== undefined) {
          this.changeBgColor(
            this.item_historial.get(index)?.nativeElement,
            temperatura
          );
          this.changeBgColor(this.price.get(index)?.nativeElement, temperatura);
        }
      });
      this.isReady = false; // Solo cambia después de aplicar estilos
    });
  }

  obtenerDatos() {
    this.historial$ = this.service.getHistorial();
    setTimeout(() => (this.isLoading = false), 500);
  }

  changeBgColor(element: HTMLElement | undefined, temperatura: number) {
    if (!element) return;

    let className = 'bg-temp-high';
    if (temperatura <= 12) className = 'bg-temp-low';
    else if (temperatura <= 25) className = 'bg-temp-middle';

    this.render2.addClass(element, className);
  }

  traducirClima(descipcion_clima: string) {
    if (descipcion_clima !== undefined) {
      return ClimaTranslate(descipcion_clima, this.idioma); // Retornar la traducción en lugar de asignarla a una variable global
    }
    return descipcion_clima;
  }

  obtenerweather(historial: any) {
    return obtenerEmojiClima(historial.tipo_clima);
  }

  irSiguiente(presupuesto: string, id_ciudad: string) {
    if (!id_ciudad) {
      alert('⚠️ Por favor, seleccione una ciudad.');
      return;
    }

    if (!presupuesto) {
      alert('⚠️ Por favor, ingrese un presupuesto.');
      return;
    }
    this.estadoService.setDatos(Number(id_ciudad), Number(presupuesto));
    this.router.navigate(['/resultado']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
