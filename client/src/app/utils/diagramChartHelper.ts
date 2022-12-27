export const dayAnalyticsOptions = (points: never[]) => {
  return {
    animationEnabled: true,
    theme: "light2",
    width: 1000,
    height: 400,
    exportEnabled: true,
    title: {
      text: "Today's income",
      fontFamily: "tahoma",
      fontWeight: "bold"
    },
    axisY: {
      prefix: "$"
    },
    axisX:{
      valueFormatString: "HH:mm:ss" ,
      labelAngle: 0
  },
    toolTip: {
      shared: true,
      contentFormatter: function (e: any) {
				var content = '';
				for (let i = 0; i < e.entries.length; i++) {
					content +="Order time: <strong>" + e.entries[i].dataPoint.x.toLocaleString().slice(11) + "</strong>";
					content += "<br/>";
          content +="Amount:  <strong>" + "$" + e.entries[i].dataPoint.y + "</strong>";
				}
				return content;
			}
		},
    legend: {
      fontSize: 13
    },
    data: [
      {
        type: "line",
        showInLegend: true,
        name: "Check amount",
        markerSize: 0,
        color: "#3f51b5",
        dataPoints: points
      }
    ]
  }
}

export const chartOptions = (points0: never[], points1: never[]) => {
  return {
    animationEnabled: true,
    width: 1000,
    height: 400,
    exportEnabled: true,
    title: {
      text: "Income and orders",
      fontFamily: "tahoma",
      fontWeight: "bold"
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
    },
    legend: {
      fontSize: 13
    },
    data: [
      {
        toolTipContent: "<strong>Income: </strong> ${y}",
        type: "splineArea",
        showInLegend: true,
        name: "Income",
        markerSize: 0,
        color: "#3f51b5",
        dataPoints: points0
      },
      {
        toolTipContent: "<strong>Orders: </strong> {y}",
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
