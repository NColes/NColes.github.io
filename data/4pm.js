$(function () {
    $('#4pm').highcharts({
	chart: {
		type: 'column'
	},
        title: {
            text: 'Title of chart',
        },
	xAxis: {
		categories: $categories,
		tickInterval:2
},
        yAxis: {
            title: {
                text: 'Releases',
		x:-11,
		y:-12
            },
        },
        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
        },
        legend: {
		y:20,
		enabled:false
        },
        series: [{
	    name: "Number of releases",
            data: $4pm
        }]

    });
});