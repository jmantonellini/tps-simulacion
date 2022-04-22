import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Styles from "./HistogramaStyles.js";
import { Paper } from "@mui/material";

const Histograma = ({
  title = "",
  subtitle = "",
  xAxis = [],
  data1 = [],
  data2 = [],
}) => {
  const options = {
    chart: {
      type: "column",
      height: 300,
      width: 729,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      categories: xAxis,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Frecuencia",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Generador",
        data: data1,
      },
      {
        name: "Esperada",
        data: data2,
      },
    ],
  };

  return (
    <Paper className={Styles.container}>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </Paper>
  );
};

export default Histograma;
