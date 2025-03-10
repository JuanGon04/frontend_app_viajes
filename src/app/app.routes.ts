import { Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { InfoViajeComponent } from './info-viaje/info-viaje.component';

export const routes: Routes = [
  { path: '', component: HistorialComponent, pathMatch: 'full' },
  { path: 'resultado', component: InfoViajeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
