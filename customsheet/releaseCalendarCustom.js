window.onload = function() {
    var today = new Date();
    var dd = today.getDate();
    ddT = today.getDate() + 1;
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    };

    if (mm < 10) {
        mm = '0' + mm
    };

    today = yyyy + '-' + mm + '-' + dd;

    document.getElementById("start").setAttribute("min", today);
    document.getElementById("end").setAttribute("min", today);
    document.getElementById("start").value = today;
    start.addEventListener('change', function() {
        if (start.value)
            end.min = start.value;
    }, false);

    end.addEventListener('change', function() {
        if (end.value)
            start.max = end.value;
    }, false);

    var addingTags = document.getElementById("searchKeywords");
    addingTags.addEventListener('change', function() {
        console.log("Tag added");
        if (addingTags.value != "")
            console.log("Tag added");
    }, false);

    //Open and close advanced options
    $('.collapseHeader').click(function() {

        $(this).nextUntil('tr.collapseHeader').toggle(700);
    });

        searchKeywordsArray = [];
        $(function() {
            $('#inputTags').tagit({
                allowSpaces: true,
                singleField: true,
                singleFieldNode: $('#searchKeywords'),
                autocomplete: {
                    delay: 0,
                    minLength: 2
                }
            });
        });
        $("#inputTags").tagit("assignedTags");
};


var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



function resizePublished() {
    var height = document.getElementsByTagName("html")[0].scrollHeight;
    window.parent.postMessage(["published", "setHeight", height], "*");
    console.log(["setHeight", height], "*");
};

function setReleaseNotes(jsonData) {
    TS = "";
    MS = "";
    DB = "";
    provDate = "";
    cancelledReason = "";
    cancelled = "";

    if (jsonData.description.finalised === false) {
        provDate = "<br> (provisional)";
    };

    if (jsonData.description.cancelled == true) {
        cancelledReason = jsonData.description.cancellationNotice[0];
        cancelled = '<img src="http://ncoles.github.io/releasesheet/cancelled.svg" class="cancelled" data-placement="left" data-placement="right" title="Cancelled: ' + cancelledReason + '"><div class="hideMe">Cancelled</div>';
    };

    if (new RegExp(marketSensitive.join("|"), "i").test(jsonData.description.title)) {
        MS = '<img src="http://ncoles.github.io/releasesheet/ms.svg" class="MS" data-placement="left" title="This release is market sensitive."><div class="hideMe">MS </div>';
    };

    if (new RegExp(timeseriesData.join("|"), "i").test(jsonData.description.title)) {
        TS = '<img src="http://ncoles.github.io/releasesheet/ts.svg" class="TS" data-placement="left" title="Timeseries data is published alongside this release"><div class="hideMe">TS </div>';
    };

    if (new RegExp(dashboardData.join("|"), "i").test(jsonData.description.title) && new RegExp(trackingTable.join("|"), "i").test(jsonData.description.title)) {
        DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard and tracking table."><div class="hideMe">EU</div>';
    } else if (new RegExp(dashboardData.join("|"), "i").test(jsonData.description.title)) {
        DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard."><div class="hideMe">DB</div>';
    } else if (new RegExp(trackingTable.join("|"), "i").test(jsonData.description.title)) {
        DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-placement="left" title="This release feeds into the &ldquo;Tracking the impact of the EU referendum&rdquo; table."><div class="hideMe">TT</div>';
    };

};

function checkReleaseDetails(jsonData) {
    if (selectTimeseries.checked === false && selectMS.checked === false && selectDashboard.checked === false) {
        buildTableRow(jsonData);
    } else {
        if (selectTimeseries.checked === true && new RegExp(timeseriesData.join("|"), "i").test(jsonData.description.title)) {
            buildTableRow(jsonData);
        } else if (selectMS.checked === true && new RegExp(marketSensitive.join("|"), "i").test(jsonData.description.title)) {
            buildTableRow(jsonData);
        } else if (selectDashboard.checked === true) {
            if (new RegExp(dashboardData.join("|"), "i").test(jsonData.description.title) || new RegExp(trackingTable.join("|"), "i").test(jsonData.description.title)) {
                buildTableRow(jsonData);
            };
        };
    };
};

function buildTableRow(jsonInput) {
    jsonDate = jsonInput.description.releaseDate.substring(8, 10);
    jsonMonth = jsonInput.description.releaseDate.substring(5, 7);
    jsonYear = jsonInput.description.releaseDate.substring(0, 4);
    //Format months to match JSON
    if (jsonMonth < 10) {
        jsonMonth = monthNames[jsonMonth.substring(1) - 1];
    };
    if (jsonDate < 10) {
        jsonDate = jsonDate.substring(1);
    };
    JSONout += '<tr><td><a href="https://api.ons.gov.uk' + jsonInput.uri + '" target="_blank">' + jsonInput.description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + provDate + '</td><td>' + jsonInput.description.releaseDate + '</td></tr>';
}

function generateCustomReleaseTable() {

    JSONout = "";
    searchKeywordsArray = document.getElementById("searchKeywords").value.split(",");

    if (searchKeywordsArray.length == 0) {

        console.log("No keywords");
        for (var i = 0; i < JSON.result.results.length; i++) {
            setReleaseNotes(JSON.result.results[i]);
            checkReleaseDetails(JSON.result.results[i]);
        };
    } else {
        for (var i = 0; i < JSON.result.results.length; i++) {

            if (new RegExp(searchKeywordsArray.join("|"), "i").test(JSON.result.results[i].description.title)) {
                console.log(JSON.result.results[i].description.title + " contains the keywords provided.");
                setReleaseNotes(JSON.result.results[i]);
                checkReleaseDetails(JSON.result.results[i]);
            };
        };
    };

    document.getElementById("publishedreleases").innerHTML = JSONout;


};


function generateCustomTable(callback) {

    console.log(customURL);

    $.getJSON(customURL, function(json) {

        JSON = json;
        tablePublished = true;
        document.getElementById("periodDate").innerHTML = startDate.getDate() + " " + monthNames[startDate.getMonth()] + " " + startDate.getFullYear() + " to " + endDate.getDate() + " " + monthNames[endDate.getMonth()] + " " + endDate.getFullYear();
        generateCustomReleaseTable();

        $('[data-toggle="tooltip"]').tooltip();
        callback && callback();
    });
};



function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
};

customSheet = function() {
    if (start.value === "" | end.value === "") {
        alert("Please fill in start and end dates");
    } else {
        document.getElementById("upcomingBox").setAttribute("style", "display:block;");
        startDate = start.value;
        startDate = new Date(startDate);
        endDate = end.value;
        endDate = new Date(endDate);
        startDay = start.value.substring(8, 10);
        startMonth = start.value.substring(5, 7);
        startYear = start.value.substring(0, 4);
        endYear = end.value.substring(0, 4);

        if (Number(end.value.substring(8, 10)) + 1 > daysInMonth(end.value.substring(5, 7), end.value.substring(0, 4))) {
            console.log("Invalid date produced");
            endDay = 1;
            endMonth = Number(end.value.substring(5, 7)) + 1;
        } else {
            endMonth = end.value.substring(5, 7);
            endDay = Number(end.value.substring(8, 10)) + 1;
        };

        customURL = "https://api.ons.gov.uk/releasecalendar/data?query=&fromDateDay=" + startDay + "&fromDateMonth=" + startMonth + "&fromDateYear=" + startYear + "&toDateDay=" + endDay + "&toDateMonth=" + endMonth + "&toDateYear=" + endYear + "&view=upcoming&size=250";

        generateCustomTable(function() {
            var createCustom = $('#customTable').dataTable({
                "lengthChange": false,
                "pageLength": 15,
                "autoWidth": false,
                "searching": false,
                "language": {
                    "zeroRecords": "No releases found."
                },
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
            var buttons = new $.fn.dataTable.Buttons(createCustom, {
                "buttons": [{
                    "extend": 'csvHtml5',
                    "exportOptions": {
                        "columns": ':visible'
                    }
                }, {
                    "extend": 'excelHtml5',
                    "exportOptions": {
                        "columns": ':visible'
                    }
                }]
            }).container().appendTo($('#dlbuttons'));
            //bindUpcomingButtons();
            var tableDrawn = true;
        });
    };
};
