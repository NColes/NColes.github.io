var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNames[mToday.getMonth()];
var monthTodayValue = mToday.getMonth();
var yToday = new Date;
var yearToday = yToday.getFullYear();
var todaysDate = dateToday + " " + monthToday;
var fortnightAway = new Date(+new Date + 12096e5);
var fortnightBack = new Date(+new Date - 12096e5);

var dAway = fortnightAway.getDate();
var mAway = fortnightAway.getMonth() + 1;
var yAway = fortnightAway.getFullYear();

var dBack = fortnightBack.getDate();
var mBack = fortnightBack.getMonth() + 1;
var yBack = fortnightBack.getFullYear();


var fortnightAwayURL = "https://www.ons.gov.uk/releasecalendar/data?query=&fromDateDay=&fromDateMonth=&fromDateYear=&toDateDay=" + dAway + "&toDateMonth=" + mAway + "&toDateYear=" + yAway + "&view=upcoming&size=50";
var fortnightBackURL = "https://www.ons.gov.uk/releasecalendar/data?query=&fromDateDay=" + dBack + "&fromDateMonth=" + mBack + "&fromDateYear=" + yBack + "&toDateDay=&toDateMonth=&toDateYear=&view=&size=50";

var marketSensitive = [
        'Balance of payments for the UK:',
        'Business investment in the UK',
        'Construction output in Great Britain:',
        'Economic well-being:',
        'Gross domestic product, preliminary estimate:',
        'Public sector employment, UK:',
        'Regional labour market statistics in the UK:',
        'Retail Sales in Great Britain:',
        'UK consumer price inflation:',
        'UK economic accounts:',
        'UK GDP, preliminary estimate:',
        'UK GDP, second estimate:',
        'UK index of production:',
        'UK index of services:',
        'UK labour market statistics:',
        'UK producer price inflation:',
        'UK public sector finances:',
        'UK quarterly national accounts:',
        'UK trade in goods by classification of product by activity (CPA 2008):',
        'UK trade:'
    ];

var timeseriesData = [
        'Balance of payments for the UK:',
        'Business enterprise research and development in the UK:',
        'Business investment in the UK',
        'Capital stock and consumption of fixed capital in the UK:',
        'Gross domestic product, preliminary estimate:',
        'Investment by insurance companies, pension funds and trusts in the UK',
        'Mergers and acquisitions involving UK companies:',
        'Overseas travel and tourism, monthly provisional:',
        'Profitability of UK Companies:',
        'Public sector employment, UK:',
        'Retail Sales in Great Britain:',
        'The Blue Book',
        'Turnover and orders in UK production and Great Britain services industries',
        'UK consumer price inflation:',
        'UK consumer trends:',
        'UK economic accounts:',
        'UK GDP, preliminary estimate:',
        'UK GDP, second estimate:',
        'UK index of production:',
        'UK index of services:',
        'UK labour market statistics:',
        'UK national accounts:',
        'UK producer price inflation:',
        'UK productivity:',
        'UK public sector finances:',
        'UK quarterly national accounts:',
        'UK services producer price index',
        'UK trade in goods by classification of product by activity',
        'UK trade:',
        'United Kingdom Balance of Payments, The Pink Book:'
    ];

function resizeTable() {
    if (document.getElementById("publishedTable").offsetHeight > document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("upcomingTable").style.height = document.getElementById("publishedTable").offsetHeight + "px";

    } else if (document.getElementById("publishedTable").offsetHeight < document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("publishedTable").style.height = document.getElementById("upcomingTable").offsetHeight + "px";

    };
};

function tableHeadingDates() { 
        if (dAway < 10) {
            dAway = dAway.substring(1);
        };

        mAway = monthNames[mAway - 1];

	document.getElementById("forwardDate").innerHTML = todaysDate + " " + yearToday + " to " + dAway + " " + mAway + " " + yAway;

        if (dBack < 10) {
            dBack = dBack.substring(1);
        };

        mBack = monthNames[mBack - 1];

	document.getElementById("backDate").innerHTML =  dBack + " " + mBack + " " + yBack + " to " + todaysDate + " " + yearToday;

};


function generateReleaseTable(arr) {

    JSONout = "";

    for (var i = 0; i < arr[0].result.results.length; i++) {
        TS = "";
        MS = "";
        cancelledReason = "";
	cancelled = "";
	
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
            MS = ' <img src="https://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(arr[0].result.results[i].description.title)) {
            TS = '<img src="https://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" title="Timeseries data is published alongside this release"><div style="display:none;">TS</div>';
        };
        
        if (arr[0].result.results[i].description.cancelled == true) {
	    cancelledReason = arr[0].result.results[i].description.cancellationNotice[0];
	    cancelled = '<img src="cancelled.svg" class="cancelled" data-toggle="tooltip" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
	};

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr><td><img src="https://ncoles.github.io/releasesheet/today.svg" class="pubToday" data-toggle="tooltip" title="Published today"> <a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';

        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';
        };

        if (tablePublished === true) {

            document.getElementById("publishedreleases").innerHTML = JSONout;

        } else {

            document.getElementById("upcomingreleases").innerHTML = JSONout;

        };

    };

};

//Published data
$.getJSON(fortnightBackURL, function(json) {
    JSON = json;

    tablePublished = true;

    generateReleaseTable([
        JSON
    ]);
    $('#publishedTable').dataTable({
        "lengthChange": false,
        "pageLength": 10,
        "searching": false,
        "autoWidth": false,
        "scrollY": '300px',
	"scrollCollapse": true,
        "order": [
            [3, "desc"]
        ],
        "columnDefs": [{
            "targets": 3,
            "visible": false
        }],
        "drawCallback": function(settings) {
            $('[data-toggle="tooltip"]').tooltip({placement: "bottom"});
        }
    });
    $('[data-toggle="tooltip"]').tooltip({placement: "bottom"});
});



//Upcoming data
$.getJSON(fortnightAwayURL, function(json) {
    JSON2 = json;

    tablePublished = false;

    generateReleaseTable([
        JSON2
    ]);
    var createUpcoming = $('#upcomingTable').dataTable({
        "lengthChange": false,
        "pageLength": 10,
        "autoWidth": false,
        "scrollY": '300px',
	"scrollCollapse": true,
        "searching": false,
        "order": [
            [3, "asc"]
        ],
        "columnDefs": [{
            "targets": 3,
            "visible": false
        }],
        "drawCallback": function(settings) {
            $('[data-toggle="tooltip"]').tooltip({placement: "bottom"});
        }
    });



    $('[data-toggle="tooltip"]').tooltip({placement: "bottom"});
});

//Todays releases
$.getJSON("https://www.ons.gov.uk/releasecalendar/data?query=&fromDateDay=" + dateToday + "&fromDateMonth=" + (monthTodayValue + 1)  + "&fromDateYear=" + yearToday + "&toDateDay=&toDateMonth=&toDateYear=&view=&size=50", function(json) {
    JSONout = "";

    for (var i = 0; i < json.result.results.length; i++) {
        TS = "";
        MS = "";
        jsonDate = json.result.results[i].description.releaseDate.substring(8, 10);
        jsonMonth = json.result.results[i].description.releaseDate.substring(5, 7);
        jsonYear = json.result.results[i].description.releaseDate.substring(0, 4);

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

        if (new RegExp(marketSensitive.join("|"), "i").test(json.result.results[i].description.title)) {
            MS = ' <img src="https://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(json.result.results[i].description.title)) {
            TS = '<img src="https://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" title="Timeseries data is published alongside this release"><div style="display:none;">TS</div>';
        };
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + json.result.results[i].uri + '">' + json.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + '</td></tr>';
	document.getElementById("toadysReleases").innerHTML = JSONout;
   };

});



//$( window ).resize(function() {
//	resizeTable();
//});


//window.setTimeout(resizeTable, 500);
