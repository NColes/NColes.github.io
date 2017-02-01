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
      MS = '<img src="http://ncoles.github.io/releasesheet/ms.svg" class="MS" data-toggle="tooltip" data-placement="left" title="This release is market sensitive."><div style="display:none;">MS </div>';
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

    JSONout += '<tr><td><a href="https://www.ons.gov.uk' + JSON.result.results[i].uri + '" target="_blank">' + JSON.result.results[i].description.title + '</a>' + '</td>' +
      '<td class="tableData" id="releaseNotes">' + TS + MS + DB + cancelled + '</td>' + '<td class="tableData">' + jsonDate + ' ' + jsonMonth + ' ' + jsonYear + '</td><td>' + JSON.result.results[i].description.releaseDate + '</td></tr>';

    document.getElementById("publishedreleases").innerHTML = JSONout;


  };

};

//Published data
function generateCustomTable(callback) {

  console.log(customURL);

  $.getJSON(customURL, function(json) {
    JSON = json;

    tablePublished = true;

    mBack = monthNames[mBack - 1];

    document.getElementById("periodDate").innerHTML = startDate.getDate() + " " + monthNames[startDate.getMonth()] + " " + startDate.getFullYear() + " to " + endDate.getDate() + " " + monthNames[endDate.getMonth()] + " " + endDate.getFullYear();

    generateCustomReleaseTable();

    $('[data-toggle="tooltip"]').tooltip();
    callback && callback();
  });
};
