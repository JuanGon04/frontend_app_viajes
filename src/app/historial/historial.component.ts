import { Observable, Subscription } from 'rxjs';
import { ActualizarHistorialService } from '../services/actualizar-historial/actualizar-historial.service';
import { InfoViajeService } from '../services/info_viaje/info-viaje.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { obtenerEmojiClima } from '../utils/emoji_clima';
import { ClimaTranslate } from '../utils/clima_translate';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit, AfterViewChecked {
  public historial$!: Observable<any>;
  private subscription!: Subscription;
  isLoading = true;
  isReady = true;
  public clima_translate: string[] = [];
  public weather!: { src: string; alt: string };
  @ViewChildren('item_historial') item_historial!: QueryList<ElementRef>;
  @ViewChildren('price') price!: QueryList<ElementRef>;
  @Input('idioma') idioma!: string;

  constructor(
    private readonly service: InfoViajeService,
    private readonly actualizacionService: ActualizarHistorialService,
    private readonly render2: Renderer2
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.subscription = this.actualizacionService.actualizar$.subscribe(() => {
      this.isLoading = true;
      this.obtenerDatos();
      this.obtenerItem();
      this.isReady=true;
    });
  }

  ngAfterViewChecked(): void {
    this.obtenerItem();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idioma'] && this.idioma && this.historial$) {
      this.historial$.subscribe((historial) => {
        historial.forEach((item: any, index: number) => {
          this.clima_translate[index] = this.traducirClima(item?.tipo_clima);
        });
      });
    }
  }

  obtenerItem() {
    if (!this.isReady) return;
  
    this.historial$.subscribe((historial) => {
      historial.forEach((item: any, index: number) => {
        const temperatura = item?.temperatura;
        this.clima_translate[index] = this.traducirClima(item?.tipo_clima);
        if (temperatura !== undefined) {
          this.changeBgColor(this.item_historial.get(index)?.nativeElement, temperatura);
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
  
    let className = "bg-temp-high";
    if (temperatura <= 12) className = "bg-temp-low";
    else if (temperatura <= 25) className = "bg-temp-middle";
  
    this.render2.addClass(element, className);
  }
  
  traducirClima(descipcion_clima:string){
    if (descipcion_clima !== undefined) {
      return ClimaTranslate(descipcion_clima, this.idioma); // Retornar la traducción en lugar de asignarla a una variable global
    }
    return descipcion_clima;
  }

  obtenerweather(historial: any) {
    return obtenerEmojiClima(historial.tipo_clima);
  }
}
