var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Open and close advanced options
$('.collapseHeader').click(function() {

  $(this).nextUntil('tr.collapseHeader').toggle(700);
});

function generateCustomReleaseTable() {

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
      MS = '<img src="http://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" data-placement="left" title="This release is market sensitive."><div style="display:none;">MS</div>';
    };

    if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
      TS = '<img src="http://ncoles.github.io/releasesheet/ts.svg" class="TS" data-toggle="tooltip" data-placement="left" title="Timeseries data is published alongside this release"><div style="display:none;">TS </div>';
    };

    if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title) && new RegExp(trackingTable.join("|"), "i").test(JSON.result.results[i].description.title)) {
      DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard and tracking table." style="margin-left:2px;"><div style="display:none;">EU</div>';
    } else if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title)) {
      DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the UK post-referendum economy dashboard." style="margin-left:2px;"><div style="display:none;">DB</div>';
    } else if (new RegExp(trackingTable.join("|"), "i").test(JSON.result.results[i].description.title)) {
      DB = '<img src="http://ncoles.github.io/releasesheet/dashboard.svg" class="DB" data-toggle="tooltip" data-placement="left" title="This release feeds into the &ldquo;Tracking the impact of the EU referendum&rdquo; table." style="margin-left:2px;"><div style="display:none;">TT</div>';
    };

    if (JSON.result.results[i].description.cancelled == true) {
      cancelledReason = JSON.result.results[i].description.cancellationNotice[0];
      cancelled = '<img src="http://ncoles.github.io/releasesheet/cancelled.svg" class="cancelled" data-toggle="tooltip" data-placement="left" data-placement="right" title="Cancelled: ' + cancelledReason + '"><div style="display:none;">Cancelled</div>';
    };



    if (searchKeywordsArray[0] === "") {

      console.log("No keywords");



      if (selectTimeseries.checked === true) {

        if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
          JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };
      };

      if (selectMS.checked === true) {
        if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
          
          JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };
      };

      if (selectDashboard.checked === true) {
        console.log("Dashboard selected");
        if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title) && new RegExp(trackingTable.join("|"), "i").test(JSON.result.results[i].description.title)) {
          JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };
      };

      if (selectTimeseries.checked === false && selectMS.checked === false && selectDashboard.checked === false) {
        JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
      };

    } else if (new RegExp(searchKeywordsArray.join("|"), "i").test(JSON.result.results[i].description.title)) {

      console.log(JSON.result.results[i].description.title + " contains the keywords provided.");


      if (selectTimeseries.checked === true) {

        if (new RegExp(timeseriesData.join("|"), "i").test(JSON.result.results[i].description.title)) {
          JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };
      };

      if (selectMS.checked === true) {
        if (new RegExp(marketSensitive.join("|"), "i").test(JSON.result.results[i].description.title)) {
          JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };
      };

      if (selectDashboard.checked === true) {
        if (new RegExp(dashboardData.join("|"), "i").test(JSON.result.results[i].description.title) && new RegExp(trackingTable.join("|"), "i").test(JSON.result.results[i].description.title)) {
          JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
        };
      };

      if (selectTimeseries.checked === false && selectMS.checked === false && selectDashboard.checked === false) {
        JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' + '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';
      };

    };

    document.getElementById("publishedreleases").innerHTML = JSONout;


  };

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

function bindUpcomingButtons() {
  $(".paginate_button").unbind('click', logUpcomingPagination);
  $(".paginate_button").bind('click', logUpcomingPagination);
};

function logUpcomingPagination() {
  window.parent.postMessage("Upcoming page changed", "*");
  $(".paginate_button").unbind('click', logUpcomingPagination);
  $(".paginate_button").bind('click', logUpcomingPagination);
};


function resizePublished() {
  var height = document.getElementsByTagName("html")[0].scrollHeight;
  window.parent.postMessage(["published", "setHeight", height], "*");
  console.log(["setHeight", height], "*");
};
