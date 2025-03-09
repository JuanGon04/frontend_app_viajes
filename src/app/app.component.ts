import { Component } from '@angular/core';
import { InfoViajeComponent } from './info-viaje/info-viaje.component';
import { HistorialComponent } from './historial/historial.component';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone:true,
    imports: [InfoViajeComponent, HistorialComponent, TranslateModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  public idioma!:string;
  title = 'frontend_app_viajes';

  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.idioma = selectElement.value;
    this.translate.use(selectElement.value);
  }

}
