import { Observable, Subscription } from "rxjs";
import { ActualizarHistorialService } from "../services/actualizar-historial/actualizar-historial.service";
import { InfoViajeService } from "../services/info_viaje/info-viaje.service";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { obtenerEmojiClima } from "../utils/emoji_clima";

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {

  public historial$!: Observable<any>;
  private subscription!: Subscription;
  isLoading = true;
  public weather!: {src: string; alt: string};

  constructor(
    private readonly service: InfoViajeService,
    private readonly actualizacionService: ActualizarHistorialService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
    this.subscription = this.actualizacionService.actualizar$.subscribe(() => {
      this.isLoading = true; // 🔹 Activa la animación al actualizar
      this.obtenerDatos();
    });
  }

  obtenerDatos() {
    this.historial$ = this.service.getHistorial();
    
    // Simula un pequeño retraso para que la animación se vea
    setTimeout(() => {
      this.isLoading = false; // 🔹 Oculta la animación después de la carga
    }, 500);
  }

  obtenerweather(historial:any){
    console.log(historial.tipo_clima);
    return obtenerEmojiClima(historial.tipo_clima);
  }
}
