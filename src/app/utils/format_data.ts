export function formatearData(data_clima: any, data_divisa: any): any {
  return {
    temperatura: data_clima.main.temp,
    condicion_meteorologica: data_clima.weather[0].description,
    tipo_clima: data_clima.weather[0].main,
    temperatura_minima: data_clima.main.temp_min,
    temperatura_maxima: data_clima.main.temp_max,
    sensacion_termica: data_clima.main.feels_like,
    ciudad_id: data_clima.id_ciudad,
    presupuesto_moneda_extranjera: data_divisa.result,
    presupuesto_moneda_local: data_divisa.query.amount,
    tasa_cambio: data_divisa.info.rate,
    simbolo_moneda: data_divisa.simbolo_moneda,
  };
}
