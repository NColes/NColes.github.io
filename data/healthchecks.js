$(function () {
    $('#healthchecks').highcharts({
	chart: {
	marginBottom:50,
},
        title: {
            text: 'Healthcheck grades of total releases, 2015',
        },
        xAxis: {
        categories: $categories,
        },

        yAxis: {

	  max:100,
	  reversedStacks:false,
          title: {
                text: '%',
            },
        },
	tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueDecimals:2,
		valueSuffix:'%'
	},

        legend: {
		y:20,
		reversed:true,
        },
	plotOptions: {
		column: {
			stacking: '%'
		}
	},
    series: [
        {
        name: 'Green',
	color: '#92D050',
        type: 'column',
        data: $green,
        tooltip: {
            valueSuffix: '%'
         },
    },

      {
        name: 'Green with Caution',
	color: '#008000',
        type: 'column',
        tooltip: {
            valueSuffix: '%'
        },
        data: $greenwc
    }, 

	{
        name: 'Amber',
        type: 'column',
	color: '#FFC000',
        tooltip: {
            valueSuffix: '%'
        },
        data: $amber
    },

	{
        name: 'Red',
        type: 'column',
	color: '#FF0000',
        tooltip: {
            valueSuffix: '%'
        },
        data: $red
    },

	{
	name: 'Onboarded',
        data: $onboardedpercent,
	color: 'black',
	type: 'line',
	marker: {
		symbol: 'circle',
		radius:3
		},
	visible:false
	},

	{
	name: 'BA Created',
        data: $bareleases,
	type: 'line',
	visible:false,
	marker: {
		symbol: 'circle',
		radius:3,
		enabled:false
		},
	dashStyle:'LongDash'
	},



    ]
 });
 });
