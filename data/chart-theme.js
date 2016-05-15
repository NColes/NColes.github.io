Highcharts.setOptions ({
    colors: ['#CC6015', '#5B41FF', '#3FFF33'],
    credits: {
	enabled:false,
},
    chart: {
	style: {
		fontFamily: 'Arial, Helvetica, sans-serif',
		},
        backgroundColor: '#FCFCFC',
    },


    title: {
        style: {
            color: '#000000',
	    fontWeight: 'bold',
	    fontSize: '16px',
        },
	align: 'center',
    },


    xAxis: {
	title: {
		style: {
			color: '#000000',
		},
	},
	labels: {
		style: {
			color: '#000000',
		},
		rotation:0
	},
    },


    yAxis: {
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
	},
    },


    subtitle: {
        style: {
            color: '#000000',
            font: 'bold 12px Arial, Helvetica, sans-serif',
        },
	align: 'left',
	verticalAlign: 'bottom',
	y: 13,
	x: -10,
    },

    legend: {
        layout: 'horizontal',
	
	align: 'center',
	verticalAlign: 'bottom',
        borderWidth: 0,	
        itemStyle: {
            font: '10pt Arial, Helvetica, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }   
    },



});
