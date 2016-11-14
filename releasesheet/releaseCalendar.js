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

function generateReleaseTable() {

    JSONout = "";

    for (var i = 0; i < JSON.result.results.length; i++) {
        TS = "";
        MS = "";
	DB = "";
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
        jsonMonth = monthNames[jsonMonth - 1];

        jsonDateToday = jsonDate + " " + jsonMonth;

        if (new RegExp(marketSensitive.join("|"), "i").test(JSON.result.results[i].description.title)) {
            MS = ' <img src="ms.svg" class="MS" data-toggle="tooltip" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
            TS = '<img src="ts.svg" class="TS" data-toggle="tooltip" title="Timeseries data is published alongside this release"><div style="display:none;">TS</div>';
        };
	    
	if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title)) {
            DB = '<img src="dashboard.svg" class="DB" data-toggle="tooltip" title="This release feeds into the UK post-referendum economy dashboard." style="margin-left:2px;"><div style="display:none;">DB</div>';
        };
        
        if (JSON.result.results[i].description.cancelled == true) {
	    cancelledReason = JSON.result.results[i].description.cancellationNotice[0];
	    cancelled = '<img src="http://ncoles.github.io/dashboard/cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="right" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
	};

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr><td><img src="today.svg" class="pubToday" data-toggle="tooltip" title="Published today"> <a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';

        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };

        if (tablePublished === true) {

            document.getElementById("publishedreleases").innerHTML = JSONout;

        } else {

            document.getElementById("upcomingreleases").innerHTML = JSONout;

        };

    };

};

//Published data
function generatePublishedTable() {
$.getJSON(fortnightBackURL, function(json) {
    JSON = json;

    tablePublished = true;

        mBack = monthNames[mBack - 1];

	document.getElementById("backDate").innerHTML =  dBack + " " + mBack + " " + yBack + " to " + todaysDate + " " + yearToday;

    generateReleaseTable();
    
    $('#publishedTable').dataTable({
        "lengthChange": false,
        "pageLength": 15,
        "searching": false,
        "autoWidth": false,
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
};

//Upcoming data
function generateUpcomingTable() {
$.getJSON(fortnightAwayURL, function(json) {
    JSON = json;

        mAway = monthNames[mAway - 1];

	document.getElementById("forwardDate").innerHTML = todaysDate + " " + yearToday + " to " + dAway + " " + mAway + " " + yAway;

    tablePublished = false;

    generateReleaseTable();
    
    var createUpcoming = $('#upcomingTable').dataTable({
        "lengthChange": false,
        "pageLength": 15,
        "autoWidth": false,
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

	 var buttons = new $.fn.dataTable.Buttons(createUpcoming, {
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
        ]
}).container().appendTo($('#dlbuttons'));

    $('[data-toggle="tooltip"]').tooltip();
});

};
