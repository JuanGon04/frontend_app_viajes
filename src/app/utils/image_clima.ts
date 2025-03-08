export const clima: Record<string, { src: string; alt: string }> = {
    Thunderstorm: {
      src: "https://cdn-icons-png.flaticon.com/128/1146/1146860.png",
      alt: "Tormenta eléctrica",
    },
    Snow: {
      src: "https://cdn-icons-png.flaticon.com/128/2766/2766082.png",
      alt: "Nieve",
    },
    Clear: {
      src: "https://cdn-icons-png.flaticon.com/128/869/869869.png",
      alt: "Día soleado",
    },
    Rain: {
      src: "https://cdn-icons-png.flaticon.com/128/8841/8841317.png",
      alt: "lluvia",
    },
    Drizzle: {
        src: "https://cdn-icons-png.flaticon.com/128/7866/7866014.png",
        alt: "llovizna",
      },
    Atmosphere: {
        src: "https://cdn-icons-png.flaticon.com/128/6975/6975250.png",
        alt: "Atmosfera",
    },
    Clouds: {
        src: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
        alt: "nubes",
    }
  };
  
  export function obtenerImagenClima(tipoClima: string):{ src: string; alt: string } {
    return clima[tipoClima] ?? {
      src: "https://cdn-icons-png.flaticon.com/128/3208/3208752.png",
      alt: "Clima desconocido",
    };
  }
  