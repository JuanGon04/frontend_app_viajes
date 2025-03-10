import { Component } from '@angular/core';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IdiomaService } from './services/status/status_idioma.service';

@Component({
    selector: 'app-root',
    standalone:true,
    imports: [ TranslateModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  public idioma!:string;
  title = 'frontend_app_viajes';

  constructor(private readonly translate: TranslateService, private readonly idiomaService: IdiomaService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.translate.use(selectElement.value);
    this.idiomaService.setIdiomaSeleccionado(selectElement.value);
  }

}
