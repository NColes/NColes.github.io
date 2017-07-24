var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNames[mToday.getMonth()];
var monthTodayValue = mToday.getMonth();
var yToday = new Date;
var yearToday = yToday.getFullYear();
var todaysDate = dateToday + " " + monthToday;
//Needs to be 15 days away as it does not include final date
var fortnightAway = new Date(+new Date + 1296000000);
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
	provDate = "";
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
            MS = ' <img src="http://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" data-placement="left" title="This release is market sensitive."><div style="display:none;">MS </div>';
        };

        if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
            TS = '<img src="http://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" data-placement="left" title="Timeseries data is published alongside this release"><div style="display:none;">TS </div>';
        };
	    
	if (JSON.result.results[i].description.finalised === false) {
	    provDate = "<br> (provisional)";
	};
	    
	if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title) && new RegExp(trackingTable.join("|"), "i").test(JSON.result.results[i].description.title)) {
            DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard and tracking table." style="margin-left:2px;"><div style="display:none;">EU</div>';
        } else 	if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title)) {
            DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard." style="margin-left:2px;"><div style="display:none;">DB</div>';
        } else if (new RegExp(trackingTable.join("|"), "i").test(JSON.result.results[i].description.title)) {
            DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the &ldquo;Tracking the impact of the EU referendum&rdquo; table." style="margin-left:2px;"><div style="display:none;">TT</div>';
        };
        
        if (JSON.result.results[i].description.cancelled == true) {
	    cancelledReason = JSON.result.results[i].description.cancellationNotice[0];
	    cancelled = '<img src="http://ncoles.github.io/releasesheet/cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="left" data-placement="right" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
	};

        //Highlight todays releases

        if (jsonDateToday === todaysDate) {

            JSONout += '<tr class="publishedToday"><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + provDate + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';

        } else {
            JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
                '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + provDate + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };

        if (tablePublished === true) {

            document.getElementById("publishedreleases").innerHTML = JSONout;

        } else {

            document.getElementById("upcomingreleases").innerHTML = JSONout;
		

        };

    };

};

//Published data
function generatePublishedTable( callback) {
$.getJSON(fortnightBackURL, function(json) {
    JSON = json;

    tablePublished = true;

        mBack = monthNames[mBack - 1];

	document.getElementById("backDate").innerHTML =  dBack + " " + mBack + " " + yBack + " to " + todaysDate + " " + yearToday;

    generateReleaseTable();

    $('[data-toggle="tooltip"]').tooltip();
    callback && callback();
});
};

//Upcoming data
function generateUpcomingTable( callback) {
$.getJSON(fortnightAwayURL, function(json) {
    JSON = json;

        mAway = monthNames[mAway - 1];

	document.getElementById("forwardDate").innerHTML = todaysDate + " " + yearToday + " to " + dAway + " " + mAway + " " + yAway;

    tablePublished = false;

    generateReleaseTable();

    $('[data-toggle="tooltip"]').tooltip();
    callback && callback();
});

};

//Todays releases
getHTMLCode = function(callback) {

    if (new RegExp(marketSensitive.join("|"), "i").test(jsonTitle)) {
        MS = ' <img src="https://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" data-placement="left" title="This release is market sensitive."><div style="display:none;">MS </div>';
    };

    if (new RegExp(timeseriesData.join("|"), "i").test(jsonTitle)) {
        TS = '<img src="https://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" data-placement="left" title="Timeseries data is published alongside this release"><div style="display:none;">TS </div>';
    };

    if (new RegExp(dashboardData.join("|"), "i").test(jsonTitle)) {
        DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard"><div style="display:none;">DB</div>';
    };
    callback && callback();
};

//Todays releases
generateTodaysReleases = function() {
tomorrowDate = new Date;
tomorrowDate.setDate(dateToday + 1);
JSONoutToday = "";
    $.getJSON("https://www.ons.gov.uk/releasecalendar/data?view=upcoming&query=&toDateDay=" + (tomorrowDate.getDate()) + "&toDateMonth=" + (tomorrowDate.getMonth() + 1) + "&toDateYear=" + (tomorrowDate.getFullYear()) + "&size=50", function(json) {
        
            for (var i = 0; i < json.result.results.length; i++) {
                TS = "";
                MS = "";
                DB = "";
		cancelled = "";
                jsonDate = json.result.results[i].description.releaseDate.substring(8, 10);
                jsonMonth = json.result.results[i].description.releaseDate.substring(5, 7);
                jsonYear = json.result.results[i].description.releaseDate.substring(0, 4);
		jsonTitle = json.result.results[i].description.title;

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

                if (json.result.results[i].description.cancelled == true) {
                    cancelledReason = json.result.results[i].description.cancellationNotice[0];
                    cancelled = '<img src="https://ncoles.github.io/releasesheet/cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="left" title = "Cancelled: ' + cancelledReason + '"> <div style="display:none;"> Cancelled </div>';
                };
	            getHTMLCode( function() {
                    JSONoutToday += '<tr><td><a href="https://www.ons.gov.uk' + json.result.results[i].uri + '">' + json.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td></tr>';
                    document.getElementById("toadysReleases").innerHTML = JSONoutToday;
                });
            };

            


            $.getJSON("https://www.ons.gov.uk/releasecalendar/data?query=&fromDateDay=" + dateToday + "&fromDateMonth=" +

                (monthTodayValue + 1) + "&fromDateYear=" + yearToday + "&size=50",
                function(json) {


                    for (var s = 0; s < json.result.results.length; s++) {
                        TS = "";
                        MS = "";
                        DB = "";
			cancelled = "";
                        jsonDate2 = json.result.results[s].description.releaseDate.substring(8, 10);
                        jsonMonth2 = json.result.results[s].description.releaseDate.substring(5, 7);
                        jsonYear2 = json.result.results[s].description.releaseDate.substring(0, 4);
			jsonTitle = json.result.results[s].description.title;

                        //Format months to match JSON
                        if (jsonMonth2 < 10) {
                            jsonMonth2 = jsonMonth2.substring(1);
                        };


                        if (jsonDate2 < 10) {
                            jsonDate2 = jsonDate2.substring(1);
                        };

                        //Display months as text
                        jsonMonth2 = monthNames[jsonMonth2 - 1];

                        jsonDateToday = jsonDate2 + " " + jsonMonth2;

                        if (json.result.results[s].description.cancelled == true) {
                            cancelledReason = JSON.result.results[s].description.cancellationNotice[0];
                            cancelled = '<img src="https://ncoles.github.io/releasesheet/cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="left" title="Cancelled: ' + cancelledReason + '"> < div style="display:none;"> Cancelled </div>';
                        };
                        
                        getHTMLCode( function() {
                            JSONoutToday += '<tr><td><a href="https://www.ons.gov.uk' + json.result.results[s].uri + '" target="_blank">' + json.result.results[s].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td></tr>';
                            document.getElementById("toadysReleases").innerHTML = JSONoutToday;
                        });
                        
                    };
                
                    $('#todaysTable').dataTable({
                        "lengthChange": false,
                        "paging": false,
                        "info": false,
                        "searching": false,
                        "autoWidth": false,
                        "ordering": false,
                        "scrollY": '300px',
                        "scrollCollapse": true,
                    });$('[data-toggle="tooltip"]').tooltip();

                });

        });

};


