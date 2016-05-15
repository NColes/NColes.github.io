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
            name: 'On board',
            data: [88,367]
        },
	{
            name: 'In progress',
            data: [11,14]
        }, 
	{
            name: 'Not invited',
            data: [59,63]
        }]

    });
});