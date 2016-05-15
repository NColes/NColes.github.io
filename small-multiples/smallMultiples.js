Highcharts.setOptions ({
    colors: [	
			"#274796",
			"#B8B8B8",
			"#F5942F",
			"#E73F40",
			"#7BCAE2",
			"#979796",
			"#E9E117",
			"#74B630",
			"#674796",
			"#BD5B9E"],
    credits: {
	enabled:false,
},
    chart: {
	style: {
		fontFamily: 'Arial, Helvetica, sans-serif',
		},
        backgroundColor: '#FCFCFC',
    },

    credits:{
	enabled:false
	},

    exporting:{
	enabled:false
	},

    tooltip:{
	enabled:true
	},

    legend:{
	enabled:false
	},

    subtitle:{
	floating:true,
	x:20
	},

    xAxis: {
	tickInterval:60,
	labels: {
		step:1
		}
	},

    yAxis: {
	max: 6,
	title: {
		style: {
			color: '#000000',
		},
		rotation:0,
		align: 'high',
		offset:0,
		y:-20,
		x:-15,
	},

	labels: {
		style: {
			color: '#000000',
		},
	}
    }

});


/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart0').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'London',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'London',
	    zIndex: 2,
            data: $london
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}

]
    });
});

/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart1').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'North East',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'North East',
	    zIndex: 2,
            data: $northEast
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});

/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart2').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'North West',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'North West',
	    zIndex: 2,
            data: $northWest
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});

/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart3').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'Yorkshire and The Humber',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'Yorkshire and <br>The Humber',
	    zIndex: 2,
            data: $yorkAndTH
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});

/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart4').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'East Midlands',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'East Midlands',
	    zIndex: 2,
            data: $eastMidlands
	},
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});


/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart5').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'West Midlands',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'West Midlands',
	    zIndex: 2,
            data: $westMidlands
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});


/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart6').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'East',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'East',
	    zIndex: 2,
            data: $east
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});


/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart7').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'South East',
		},
        xAxis: {
            categories: $categories
},

        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'South East',
	    zIndex: 2,
            data: $southEast
        },
	{
	    name: 'England',
	    zIndex: 1,
            data: $england
	}
]
    });
});


/* ------------------------------------------------------------------------ */


$(function () {
    $('#chart8').highcharts({
	title: {
		text: ''
		},
	subtitle: {
		text: 'South West',
		},
        xAxis: {
            categories: $categories
,
	},
        tooltip: {
		shared:true,
		borderColor: '#e6e3da',
		valueSuffix: "",
		valueDecimals:2
        },

        series: [{
	    name: 'South West',
	    zIndex: 2,
            data: $southWest},

{
	    name: 'England',
	    zIndex: 1,
            data: $england
        }
]
    });
});