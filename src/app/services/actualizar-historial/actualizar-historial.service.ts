import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarHistorialService {

  private readonly actualizar = new Subject<void>();
  actualizar$ = this.actualizar.asObservable();

  emitirActualizacion() {
    this.actualizar.next();
  }
}
