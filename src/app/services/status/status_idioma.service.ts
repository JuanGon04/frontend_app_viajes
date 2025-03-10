import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdiomaService {
  private readonly idioma = new BehaviorSubject<string | null>(null);
  idioma$ = this.idioma.asObservable();

  setIdiomaSeleccionado(id_idioma: string) {
    this.idioma.next(id_idioma); // 🔥 Notifica a todos los que escuchen este valor
  }
}
