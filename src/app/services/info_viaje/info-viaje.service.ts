import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InfoViajeService {
  private readonly ciudades_Url = `${environment.apiUrl}ciudades`;
  private readonly clima_Url = `${environment.apiUrl}weather`;
  private readonly currency_Url = `${environment.apiUrl}currency`;

  constructor(private readonly http: HttpClient) {}

  getCiudades(): Observable<any> {
    return this.http.get<any>(this.ciudades_Url);
  }

  getClima(id_ciudad:number): Observable<any> {
    return this.http.get<any>(`${this.clima_Url}/${id_ciudad}`);
  }

  getCurrency(id_ciudad:number, presupuesto:number): Observable<any> {
    return this.http.get<any>(`${this.currency_Url}?id=${id_ciudad}&amount=${presupuesto}`);
  }
}
