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
