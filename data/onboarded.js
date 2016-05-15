$(function () {
    $('#onboarded').highcharts({
        title: {
            text: 'Title',
        },
        xAxis: {
            categories:$categories,
	tickInterval:2,
	labels: {
		step:1
		}
        },
        yAxis: {
	    max:100,
            title: {
                text: '%',
		x:-17
		},
            },

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "%",
		valueDecimals:2
        },
        legend: {
		enabled:true	
        },
        series: [{
	    name: 'BA Created',
            data: $bareleases
        },
		{
	    name: 'Onboarded',
            data: $onboardedpercent,
        }
]
    });
});