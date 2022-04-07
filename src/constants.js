export const API_GENERADOR = {
  lenguaje: "http://localhost:8080/api/generador/lenguaje",
  custom: "http://localhost:8080/api/generador/custom",
};
export const API_HISTOGRAMA = {
  lenguaje: "http://localhost:8080/api/histograma/lenguaje",
  custom: "http://localhost:8080/api/histograma/custom",
};

export const RND_GEN_VAR_KEYS = {
  A: "a",
  C: "c",
  M: "m",
  K: "k",
  N: "n",
  SEED: "seed",
  INTERVAL: "interval",
};

export const RND_GEN_TYPES = {
  rndConMix: "rndConMix", // Generador lineal congruente Mixto
  rndConMul: "rndConMul", // Generador lineal congruente Multiplicativo
  rndJS: "rndJS", // Generador de JavaScript
};
