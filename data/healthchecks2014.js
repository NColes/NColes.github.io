$(function () {
    $('#healthchecks2014').highcharts({
	chart: {
	marginBottom:50,
},
        title: {
            text: 'Healthcheck grades of total releases, 2014',
        },
        xAxis: {
        categories: $categories,
	title: {
		text: '2014'
		},
	tickInterval:2,
	labels: {
		step:1
		}
        },

        yAxis: {

	  max:100,

          title: {
                text: '%',
            },
        },
	tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueDecimals:2
	},

        legend: {
		layout: "vertical",
		reversed:true,
		align: "right",
		verticalAlign: "middle",
		width:100,
		labelFormatter: function() 
                {
                      var legendName = this.name;
                      var match = legendName.match(/.{1,11}/g);
                      return match.toString().replace(/\,/g,"<br/>");
                } 
        },
	plotOptions: {
		column: {
			stacking: '%'
		}
	},
    series: [

{
        name: 'Red',
        type: 'column',
	color: '#FF0000',
        tooltip: {
            valueSuffix: '%'
        },
        data: $red2014
    },

	{
        name: 'Amber',
        type: 'column',
	color: '#FFC000',
        tooltip: {
            valueSuffix: '%'
        },
        data: $amber2014
    },

      {
        name: 'Green with Caution',
	color: '#008000',
        type: 'column',
        tooltip: {
            valueSuffix: '%'
        },
        data: $greenwc2014
    }, 

        {
        name: 'Green',
	color: '#92D050',
        type: 'column',
        data: $green2014,
        tooltip: {
            valueSuffix: '%'
        },
	}

    ]
 });
 });
