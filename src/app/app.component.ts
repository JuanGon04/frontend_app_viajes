import { Component } from '@angular/core';
import { InfoViajeComponent } from './info-viaje/info-viaje.component';

@Component({
    selector: 'app-root',
    standalone:true,
    imports: [InfoViajeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_app_viajes';
}
