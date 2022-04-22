import { Slide } from "@mui/material";
import React from "react";

export const parseRandomsTableRows = ({ iteracion, valor }) => {
  return {
    iteracion,
    valor,
  };
};

export const parseFrequencyTableRows = ({
  intervalo,
  inferior,
  superior,
  marcaClase,
  frecuencia,
  frecuenciaAcumulada,
  frecuenciaEsperada,
  proporcion,
  proporcionAcumulada,
}) => {
  return {
    intervalo,
    inferior,
    superior,
    marcaClase,
    frecuencia,
    frecuenciaAcumulada,
    frecuenciaEsperada,
    proporcion,
    proporcionAcumulada,
  };
};

export const parseFrequencyTableRowsPoisson = ({
  intervalo,
  valor,
  frecuencia,
  frecuenciaEsperada,
}) => {
  return {
    intervalo,
    valor,
    frecuencia,
    frecuenciaEsperada,
  };
};

export const frequencyTableHeaderRow = [
  { tooltipText: "Intervalo", title: "N" },
  { tooltipText: "Límite inferior", title: "<" },
  { tooltipText: "Límite superior", title: ">" },
  { tooltipText: "Marca de clase", title: "M C" },
  { tooltipText: "Frecuencia", title: "F" },
  { tooltipText: "Frecuencia acumulada", title: "F A" },
  { tooltipText: "Frecuencia esperada", title: "F E" },
  { tooltipText: "Proporción (Frecuencia relativa)", title: "P" },
  {
    tooltipText: "Proporción acumulada(Frecuencia relativa acumulada)",
    title: "P A",
  },
];

export const frequencyTableHeaderRowPoisson = [
  { tooltipText: "Intervalo", title: "N" },
  { tooltipText: "Valor", title: "Valor" },
  { tooltipText: "Frecuencia", title: "F" },
  { tooltipText: "Frecuencia esperada", title: "F E" },
];

export const randomsTableHeaderRow = [
  { tooltipText: "Iteración", title: "N" },
  { tooltipText: "Número aleatorio generado", title: "Random" },
];

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
