var monthNamesLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNamesLong[mToday.getMonth()];
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

function tableHeadingDates() { 

        mAway = monthNamesLong[mAway - 1];

	document.getElementById("forwardDate").innerHTML = todaysDate + " " + yearToday + " to " + dAway + " " + mAway + " " + yAway;

        mBack = monthNamesLong[mBack - 1];

	document.getElementById("backDate").innerHTML =  dBack + " " + mBack + " " + yBack + " to " + todaysDate + " " + yearToday;

};


function generateReleaseTable() {

    JSONout = "";

    for (var i = 0; i < JSON.result.results.length; i++) {
        TS = "";
        MS = "";
	cancelledReason = "";
	cancelled = "";
        jsonDate = JSON.result.results[i].description.releaseDate.substring(8, 10);
        jsonMonth = JSON.result.results[i].description.releaseDate.substring(5, 7);
        jsonYear = JSON.result.results[i].description.releaseDate.substring(0, 4);

        //Format months to match JSON
        if (jsonMonth < 10) {
            jsonMonth = jsonMonth.substring(1);
        };


        if (jsonDate < 10) {
            jsonDate = jsonDate.substring(1);
        };

        //Display months as text
        jsonMonth = monthNamesLong[jsonMonth - 1];

        jsonDateToday = jsonDate + " " + jsonMonth;

        if (new RegExp(marketSensitive.join("|"), "i").test(JSON.result.results[i].description.title)) {
            MS = ' <img src="https://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" data-placement="left" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
            TS = '<img src="https://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" data-placement="left" title="Timeseries data is published alongside this release"><div style="display:none;">TS</div>';
        };

	if (JSON.result.results[i].description.cancelled == true) {
	    cancelledReason = JSON.result.results[i].description.cancellationNotice[0];
	    cancelled = '<img src="cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="left" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
	};

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr><td><img src="https://ncoles.github.io/releasesheet/today.svg" class="pubToday" data-toggle="tooltip" data-placement="right" title="Published today"> <a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';

        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
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

    generateReleaseTable();
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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
});

//Upcoming data
$.getJSON(fortnightAwayURL, function(json) {
    JSON = json;
    tablePublished = false;
    generateReleaseTable();
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
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
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
        jsonMonth = monthNamesLong[jsonMonth - 1];

        jsonDateToday = jsonDate + " " + jsonMonth;

        if (new RegExp(marketSensitive.join("|"), "i").test(json.result.results[i].description.title)) {
            MS = ' <img src="https://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" data-placement="left" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(json.result.results[i].description.title)) {
            TS = '<img src="https://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" data-placement="left" title="Timeseries data is published alongside this release"><div style="display:none;">TS</div>';
        };

	if (json.result.results[i].description.cancelled == true) {
	    cancelledReason = JSON.result.results[i].description.cancellationNotice[0];
	    cancelled = '<img src="cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="left" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
	};
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + json.result.results[i].uri + '">' + json.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + '</td></tr>';
	document.getElementById("toadysReleases").innerHTML = JSONout;
   };$('[data-toggle="tooltip"]').tooltip();

});

tableHeadingDates();
