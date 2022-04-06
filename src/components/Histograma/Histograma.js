import React, { useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Histograma = ({
  title = '',
  subtitle = '',
  xAxis = [],
  data1 = [],
  data2 = [],
}) => {
  console.log(data1)
  const options = {
    chart: {
      type: 'column',
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
        text: 'Rainfall (mm)',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
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
        name: 'Tokyo',
        data: data1,
      },
      // {
      //   name: 'New York',
      //   data: data2,
      // },
    ],
  }

  return (
    <div id="container" style={{ height: '100%', width: '400px' }}>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}

export default Histograma
