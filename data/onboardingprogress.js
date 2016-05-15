$(function () {
    $('#onboardingprogress').highcharts({
	chart: {
		type: 'column'
	},
        title: {
            text: 'Progress',
        },
	xAxis: {
		categories: ['Releases','Editions']
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
		y:20	
        },
        series: [{
            name: 'A',
            data: [88,367]
        },
	{
            name: 'B',
            data: [11,14]
        }, 
	{
            name: 'C',
            data: [59,63]
        }]

    });
});