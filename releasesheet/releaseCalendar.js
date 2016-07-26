var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNames[mToday.getMonth()];
var monthTodayValue = mToday.getMonth();
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

function resizeTable() {
    if (document.getElementById("publishedTable").offsetHeight > document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("upcomingTable").style.height = document.getElementById("publishedTable").offsetHeight + "px";

    } else if (document.getElementById("publishedTable").offsetHeight < document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("publishedTable").style.height = document.getElementById("upcomingTable").offsetHeight + "px";

    };
};


function generateReleaseTable(arr) {

    JSONout = "";

    marketSensitive = [
        'Balance of payments for the UK:',
        'Business investment in the UK:',
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

    timeseriesData = [
        'Balance of payments for the UK:',
        'Business enterprise research and development in the UK:',
        'Business investment in the UK:',
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
            MS = ' <img src="ms.svg" class="MS" data-toggle="tooltip" title="This release is market sensitive."> <div style="display:none;">MS</div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(arr[0].result.results[i].description.title)) {
            TS = ' <img src="ts.svg" class="TS" data-toggle="tooltip" title="Timeseries data is published alongside this release">  <div style="display:none;">TS</div>';
        };

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr><td><img src="today.svg" class="pubToday" data-toggle="tooltip" title="Published today"> <a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData">' + MS + TS + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';

        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData">' + MS + TS + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';
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
        "pageLength": 15,
        "searching": false,
        "autoWidth": false,
        "order": [
            [2, "desc"]
        ],
        "columnDefs": [{
            "targets": 2,
            "visible": false
        }]

    });
    $('[data-toggle="tooltip"]').tooltip();
});



//Upcoming data
$.getJSON(fortnightAwayURL, function(json) {
    JSON2 = json;

    tablePublished = false;

    generateReleaseTable([
        JSON2
    ]);
    $('#upcomingTable').dataTable({
        "lengthChange": false,
        "pageLength": 15,
        "autoWidth": false,
        "searching": false,
        "dom": 'Bfrtip',
        "buttons": [

            {
                "extend": 'csvHtml5',
                "exportOptions": {
                    "columns": ':visible'
                }
            }, {
                "extend": 'excelHtml5',
                "exportOptions": {
                    "columns": ':visible'
                }
            }
        ],
        "order": [
            [2, "asc"]
        ],
        "columnDefs": [{
            "targets": 2,
            "visible": false
        }]
    });
    $('[data-toggle="tooltip"]').tooltip();
});




//$( window ).resize(function() {
//	resizeTable();
//});


//window.setTimeout(resizeTable, 500);