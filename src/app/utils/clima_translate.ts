export const climaEs: Record<string, string> = {
    Thunderstorm: 'Tormenta',
    Snow: 'Nieva',
    Clear: 'Soleado',
    Rain: 'LLuvia',
    Drizzle: 'LLovizna', 
    Atmosphere: 'Condicion Atmosferica',
    Clouds: 'Nubes',
    null: ''
  };

  export const climaEn: Record<string, string> = {
    Thunderstorm: 'Thunderstorm',
    Snow: 'Snow',
    Clear: 'Clear Sky',
    Rain: 'Rain',
    Drizzle: 'Drizzle', 
    Atmosphere: 'Atmosphere Condition',
    Clouds: 'Clouds',
    null: ''
  };
  
  export function ClimaTranslate(tipoClima: string, idioma:string | null):string {
    if(idioma==='en')
        return climaEn[tipoClima];
    
    return climaEs[tipoClima];
}