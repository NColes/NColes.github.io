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

function resizeTable() {
    if (document.getElementById("publishedTable").offsetHeight > document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("upcomingTable").style.height = document.getElementById("publishedTable").offsetHeight + "px";

    } else if (document.getElementById("publishedTable").offsetHeight < document.getElementById("upcomingTable").offsetHeight) {

        document.getElementById("publishedTable").style.height = document.getElementById("upcomingTable").offsetHeight + "px";

    };
};

function tableHeadingDates() { 

        mAway = monthNames[mAway - 1];

	document.getElementById("forwardDate").innerHTML = todaysDate + " " + yearToday + " to " + dAway + " " + mAway + " " + yAway;

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
            MS = ' <img src="ms.svg" class="MS" data-toggle="tooltip" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(arr[0].result.results[i].description.title)) {
            TS = '<img src="ts.svg" class="TS" data-toggle="tooltip" title="Timeseries data is published alongside this release"><div style="display:none;">TS</div>';
        };
        
        if (arr[0].result.results[i].description.cancelled == true) {
	    cancelledReason = arr[0].result.results[i].description.cancellationNotice[0];
	    cancelled = '<img src="../dashboard/cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="right" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
	};

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr><td><img src="today.svg" class="pubToday" data-toggle="tooltip" title="Published today"> <a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';

        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + arr[0].result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + arr[0].result.results[i].description.releaseDate + '</td></tr>';
        };

        if (tablePublished === true) {

            document.getElementById("publishedreleases").innerHTML = JSONout;

        } else {

            document.getElementById("upcomingreleases").innerHTML = JSONout;

        };

    };

};

tableHeadingDates();

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
    JSON2 = json;

    tablePublished = false;

    generateReleaseTable([
        JSON2
    ]);
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




//$( window ).resize(function() {
//	resizeTable();
//});


//window.setTimeout(resizeTable, 500);
