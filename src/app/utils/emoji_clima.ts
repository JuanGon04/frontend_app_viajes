export const clima: Record<string, string> = {
    Thunderstorm: '⛈️',
    Snow: '🌨️',
    Clear: '☀️',
    Rain: '🌧️',
    Drizzle: '🌦️', 
    Atmosphere: '🌪️',
    Clouds: '🌫️',
    null: '🌤️'
  };
  
  export function obtenerEmojiClima(tipoClima: string):string {
    return clima[tipoClima]
}
  