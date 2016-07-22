var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNames[mToday.getMonth()];
var todaysDate = dateToday + " " + monthToday;


function generateReleaseTable(arr) {

    JSONout = "";
    


    marketSensitive = [ 'Balance of payments for the UK',
		        'Business investment in the UK',
		        'Construction output in Great Britain',
		        'UK consumer price inflation',
		        'Economic well-being',
		        'UK GDP, preliminary estimate',
		        'UK GDP, second estimate',
		        'UK quarterly national accounts',
		        'UK index of production',
		        'UK index of services',
		        'UK labour market statistics',
		        'Regional labour market statistics in the UK',
		        'UK producer price inflation',
		        'Public sector employment, UK',
		        'UK public sector finances:',
		        'Retail Sales in Great Britain',
		        'UK economic accounts',
		        'UK trade',
		        'UK trade in goods by classification of product by activity (CPA 2008)',
		        'Gross domestic product, preliminary estimate:' ];

    timeseriesData = [ 'UK GDP, second estimate',
		       'Overseas travel and tourism, monthly provisional',
		       'UK labour market statistics',
		       'UK public sector finances:',
		       'Retail Sales in Great Britain',
		       'UK index of services',
		       'UK GDP, preliminary estimate',
		       'Profitability of UK Companies',
		       'UK index of production',
		       'UK trade',
		       'UK producer price inflation',
		       'UK consumer price inflation',
		       'Turnover and orders in UK production and Great Britain services industries (TOPSI)',
		       'UK services producer price index',
		       'Business investment in the UK',
		       'Mergers and acquisitions involving UK companies',
		       'Public sector employment, UK',
		       'UK trade in goods by classification of product by activity (CPA 2008)',
		       'Balance of payments for the UK',
		       'UK consumer trends',
		       'UK quarterly national accounts',
		       'UK economic accounts',
		       'UK productivity',
		       'Business enterprise research and development in the UK',
		       'Capital stock and consumption of fixed capital in the UK',
		       'Investment by insurance companies, pension funds and trusts in the UK (MQ5)',
		       'United Kingdom Balance of Payments, The Pink Book',
		       'UK national accounts (The Blue Book)',
		       'Gross domestic product, preliminary estimate:',
		       'UK national accounts'];

    for (var i = 0; i < arr[0].result.results.length; i++) {
        TS = "";
        MS = "";
        jsonDate = arr[0].result.results[i].description.releaseDate.substring(8, 10);
        jsonMonth = arr[0].result.results[i].description.releaseDate.substring(5, 7);
        jsonYear = arr[0].result.results[i].description.releaseDate.substring(0, 4);

        //Format months to match JSON
        if (jsonMonth < 10) {
            jsonMonth = jsonMonth.substring(1);
        };


        if (jsonDate < 10) {
            jsonDate = jsonDate.substring(1);
        };

        //Display months as text
        jsonMonth = monthNames[jsonMonth - 1];
        
        jsonDateToday = jsonDate + " " + jsonMonth;

        if (new RegExp(marketSensitive.join("|"), "i").test(arr[0].result.results[i].description.title)) {
            MS = ' <img src="ms.svg" class="MS" data-toggle="tooltip" title="This release is market sensitive.">';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(arr[0].result.results[i].description.title)) {
            TS = ' <img src="ts.svg" class="TS" data-toggle="tooltip" title="Timeseries data is published alongside this release">';
        };

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr><td><img src="today.svg" class="pubToday" data-toggle="tooltip" title="Published today"> <a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + MS + TS + '</td>' +
                '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';
                
        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + MS + TS + '</td>' +
                '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';
        };

        if (tablePublished === true) {

            document.getElementById("publishedreleases").innerHTML = JSONout;

        } else {

            document.getElementById("upcomingreleases").innerHTML = JSONout;

        };

    };

};

//Published data
$.getJSON("https://www.ons.gov.uk/releasecalendar/data?query=&fromDate=&toDate=&view=&size=20", function(json) {
    JSON = json;

    tablePublished = true;

    generateReleaseTable([
        JSON
    ]);

    $('#publishedTable').dataTable({
        "paging": false,
        "searching": false,
        "autoWidth": false,
        "info": false,
        "order": [
            [2, "desc"]
        ],
        "columnDefs": [{
            "targets": 2,
            "visible": false
        }]

    });

});


//Upcoming data
$.getJSON("https://www.ons.gov.uk/releasecalendar/data?view=upcoming&query=&fromDate=&toDate=&view=&size=20", function(json) {
    JSON2 = json;

    tablePublished = false;

    generateReleaseTable([
        JSON2
    ]);

    $('#upcomingTable').dataTable({
        "paging": false,
        "autoWidth": false,
        "searching": false,
        "info": false,
        "order": [
            [2, "asc"]
        ],
        "columnDefs": [{
            "targets": 2,
            "visible": false
        }]
    });

    if (document.getElementById("publishedTable").offsetHeight < document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("publishedTable").style.height = document.getElementById("upcomingTable").offsetHeight + "px";

    } else if (document.getElementById("publishedTable").offsetHeight > document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("upcomingTable").style.height = document.getElementById("publishedTable").offsetHeight + "px";

    };
$('[data-toggle="tooltip"]').tooltip();
});

