import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoViajeService } from '../services/info_viaje/info-viaje.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-info-viaje',
    standalone:true,
    imports: [CommonModule],
    templateUrl: './info-viaje.component.html',
    styleUrls: ['./info-viaje.component.css']
})
export class InfoViajeComponent implements OnInit{

  public ciudades$!: Observable<any>;
  public clima$!: Observable<any>;
  public currency$!: Observable<any>;
  public id_ciudad!: number;
  public presupuesto!: number;
  public ciudad!:string;
  public pais!:string;



  constructor(private readonly service: InfoViajeService) {}

  ngOnInit(): void {
    this.ciudades$ = this.service.getCiudades();
  }

  obtenerValores(presupuesto:string, id_ciudad:string) {
    if (!presupuesto) {
      alert("⚠️ Por favor, ingrese un presupuesto.");
      return;
    }

    if (!id_ciudad) {
      alert("⚠️ Por favor, seleccione una ciudad.");
      return;
    }

    this.clima$ = this.service.getClima(Number(id_ciudad));

    this.currency$ = this.service.getCurrency(Number(id_ciudad), Number(presupuesto));
    console.log("llamado a la api");
  }

}
