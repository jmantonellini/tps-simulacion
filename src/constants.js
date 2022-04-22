export const API_GENERADORES = {
  lenguaje: "http://localhost:8080/api/generador/lenguaje",
  custom: "http://localhost:8080/api/generador/custom",
  uniforme: "http://localhost:8080/api/generador/uniformeab",
  normal: "http://localhost:8080/api/generador/normal",
  poisson: "http://localhost:8080/api/generador/poisson",
  exponencial: "http://localhost:8080/api/generador/exponencialnegativa",
};
export const API_HISTOGRAMA = {
  lenguaje: "http://localhost:8080/api/histograma/lenguaje",
  custom: "http://localhost:8080/api/histograma/custom",
};

export const INPUT_TYPES = {
  TEXT: "text",
  SELECT: "select",
};

export const RND_GEN_VAR_KEYS = {
  A: "a",
  B: "b",
  N: "n",
  MEDIA: "media",
  DESVIACION: "desviacion",
  INTERVAL: "interval",
  DISTRIBUCION: "distribucion",
};

export const DISTR_KEYS = {
  NORMAL: "normal",
  POISSON: "poisson",
  UNIFORME: "uniforme",
  EXPONENCIAL: "exponencial",
};

export const RND_GEN_TYPES = {
  rndConMix: "rndConMix", // Generador lineal congruente Mixto
  rndConMul: "rndConMul", // Generador lineal congruente Multiplicativo
  rndJS: "rndJS", // Generador de JavaScript
  uniforme: "uniforme",
  normal: "normal",
  poisson: "poisson",
  exponencial: "exponencial",
};
