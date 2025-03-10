# frontend_app_viajes

## Descripción
Frontend de una aplicación para gestionar viajes, proporcionando información sobre el clima y presupuesto en diferentes ciudades. Desarrollado con **Angular 19** y **Bootstrap**.

## Tecnologías utilizadas
- **Angular 19** (Framework frontend)
- **TypeScript** (Lenguaje de programación)
- **Bootstrap** (Estilos y diseño responsivo)
- **Ngx-Translate** (Internacionalización)
- **RxJS** (Manejo de datos reactivos)
- **HTTPClient** (Consumo de APIs)

## Instalación y configuración
### Prerrequisitos
- **Node.js** (v18 o superior)
- **Angular CLI** (v19 o superior)

### Pasos de instalación
```sh
# Clonar el repositorio
git clone https://github.com/JuanGon04/frontend_app_viajes.git
cd frontend_app_viajes

# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
ng serve --open
```
Esto iniciará el proyecto en `http://localhost:4200/`.

## Uso del proyecto
1. **Selecciona un destino de viaje**.
2. **Consulta el clima** de la ciudad elegida.
3. **Gestiona el presupuesto** en la moneda local.

## Arquitectura y estructura del código
El proyecto sigue la estructura estándar de Angular:
```
frontend_app_viajes/
│── src/
│   ├── app/              # Componentes y servicios
│   │   ├── components/   # Componentes UI
│   │   ├── services/     # Servicios (HTTP, manejo de datos)
│   ├── assets/           # Recursos estáticos (i18n, imágenes)
│   ├── environments/     # Configuración de entornos
│   ├── main.ts           # Punto de entrada
│   ├── styles.css        # Estilos globales
│── angular.json          # Configuración de Angular
│── package.json          # Dependencias y scripts
```

### Principales funcionalidades
- **Internacionalización** con `ngx-translate`
- **Manejo de estados** con `RxJS`
- **Consumo de APIs** para obtener información climática y de cambio de moneda
- **Interfaz responsiva** con `Bootstrap`

### Peticiones al Backend

```typescript
import { HttpClient} from '@angular/common/http';
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
  private readonly historial_Url = `${environment.apiUrl}historial`;

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
  getHistorial(): Observable<any> {
    return this.http.get<any>(this.historial_Url);
  }
  guardarHistorial(data: any): Observable<any> {
    return this.http.post(this.historial_Url, data);
  }
}

```
Este servicio maneja la lógica para obtener los datos proporcionado por la API del clima y la del cambio de moneda. Asimismo, envía la peticion para guardar el historial en la base de datos. 

## Servicio de Consultas (consulta-service.service.ts)


## Configuración de internacionalización
Los archivos de traducción deben estar en `src/assets/i18n/`, por ejemplo:
```
assets/i18n/
│── es.json  # Español
│── en.json  # Inglés
```
Para agregar un idioma, simplemente crea un nuevo archivo JSON con las traducciones correspondientes.

## Licencia
Este proyecto está bajo la licencia MIT.
