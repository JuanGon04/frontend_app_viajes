import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private ciudad_id: number | null = null;
  private presupuesto: number | null = null;

  setDatos(ciudad_id: number, presupuesto: number) {
    this.ciudad_id = ciudad_id;
    this.presupuesto = presupuesto;
  }

  getDatos() {
    return { ciudad_id: this.ciudad_id, presupuesto: this.presupuesto};
  }

  limpiarDatos() {
    this.ciudad_id = null;
    this.presupuesto = null;
  }
}
