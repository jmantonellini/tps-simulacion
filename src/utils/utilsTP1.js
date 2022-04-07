import { Slide } from "@mui/material";
import React from "react";

export const parseRandomsTableRows = ({ iteracion, random, xi }) => {
  return {
    iteracion,
    random,
    xi,
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

export const frequencyTableHeaderRow = [
  { tooltipText: "Intervale", title: "N" },
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

export const randomsTableHeaderRow = [
  { tooltipText: "Iteración", title: "N" },
  { tooltipText: "Resto de la división", title: "Xi" },
  { tooltipText: "Número random generado", title: "Random" },
];

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
