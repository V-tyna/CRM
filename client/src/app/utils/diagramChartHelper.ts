export const chartOptions = (points0: never[], points1: never[]) => {
  return {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Income and orders"
    },
    axisY: {
      prefix: "$"
    },
    axisX:{
      valueFormatString: "DD MMM" ,
      labelAngle: -30
  },
    toolTip: {
      shared: true,
      content: "{name}: ${y}"
    },
    legend: {
      fontSize: 13
    },
    data: [
      {
        type: "splineArea",
        showInLegend: true,
        name: "Income",
        markerSize: 0,
        color: "#3f51b5",
        dataPoints: points0
      },
      {
        type: "splineArea",
        showInLegend: true,
        name: "Orders",
        markerSize: 0,
        color: "#ff4081",
        dataPoints: points1
      }
    ]
  }
}
