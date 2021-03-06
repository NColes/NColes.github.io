var myURL = "https://www.ons.gov.uk/releasecalendar/data?query=&view=upcoming&size=250";
var categoriesArray = [];
var categories = [];
var categoriesFormatted = [];
var categoriesF = [];
var dataArray = [];
var arrayValue = 0;
var dateTimeArray = [];
var masterArray = [];
var valueMasterArray = [];

function thousandsSeperator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


function getReleaseData( callback) {

dateChange = function(tableDate) {
	finalDate = new Date(tableDate);
//	finalDate = new Date(tableDate + "T09:30:00.000Z");
	finalDate = finalDate.getTime();
};

    $.getJSON(myURL, function(json) {

        console.log(json.result.numberOfResults);
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (var i = 0; i < json.result.results.length; i++) {
            categoriesArray.push(json.result.results[i].description.releaseDate.substring(0, 10));
            dateChange(json.result.results[i].description.releaseDate.substring(0,10));
            dateTimeArray.push(finalDate);

        };
callback && callback();
    });

};

function removeDuplicates( callback) {
    $.each(categoriesArray, function(i, el) {
        if ($.inArray(el, categories) === -1) categories.push(el);
    });
callback && callback();
};
function removeDuplicates2( callback) {
    $.each(dateTimeArray, function(x, ex) {
        if ($.inArray(ex, categoriesF) === -1) categoriesF.push(ex);
    });
callback && callback();
};

function getData( callback) {
    $.getJSON(myURL, function(json) {
        for (var x = 0; x < categoriesF.length; x++) {
            for (var i = 0; i < json.result.results.length; i++) {

                if (json.result.results[i].description.releaseDate.substring(0, 10) === categories[x]) {
                    arrayValue++;
                };
            };
            dataArray.push(arrayValue);
            arrayValue = 0;
        };
callback && callback();
    });

};

function buildMasterArray( callback) {

for(var i = 0; i < categoriesF.length; i++) {
    valueMasterArray.push(categoriesF[i]);
    valueMasterArray.push(dataArray[i]);
    masterArray.push(valueMasterArray);
    valueMasterArray = [];
};
callback && callback();
};

function loadChart( callback) {

    $('#upcomingReleases').highcharts({
        colors: ['#3B7A9E'],
        plotOptions: {
            column: {
                borderWidth: 0,
                zones: [{
                    value: 4,
                    color: '#74B630'
                }, {
                    value: 7,
                    color: '#F5942F'
                }, {
                    value: 20,
                    color: '#E73F40'
                }]
            }
        },


        chart: {
            backgroundColor: '#f5f5f5',
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
	    type: 'datetime',
	    labels: {
		format: '{value:%e %b %Y}'
		}
        },
        yAxis: {
            title: {
                text: "Number of releases",
                align: 'high',
                rotation: 0,
                offset: -85,
                y: -20
            },

        },
        credits: {
            href: 'https://www.ons.gov.uk/releasecalendar?query=&view=upcoming&size=250',
            text: 'Office for National Statistics: Release calendar',
        },
        tooltip: {
            shared: true
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Releases',
            data: masterArray

        }]
    });
callback && callback();
};

loadBoxes = function() {

    $.getJSON("https://www.ons.gov.uk/publications/data?sortBy=release_date&query=&allReleases=1", function(json) {
        document.getElementById("totalBulletins").innerHTML = json.counts.docCounts.bulletin;
        document.getElementById("totalArticles").innerHTML = json.counts.docCounts.article + json.counts.docCounts.article_download;
        document.getElementById("totalCompendia").innerHTML = json.counts.docCounts.compendium_landing_page;
    });

    $.getJSON("https://www.ons.gov.uk/publications/data", function(json) {
        document.getElementById("totalBulletinsUnique").innerHTML = json.counts.docCounts.bulletin;
        document.getElementById("totalArticlesUnique").innerHTML = json.counts.docCounts.article + json.counts.docCounts.article_download;
        document.getElementById("totalCompendiaUnique").innerHTML = json.counts.docCounts.compendium_landing_page;
    });

    $.getJSON("https://www.ons.gov.uk/datalist/data", function(json) {
        document.getElementById("totalDatasets").innerHTML = thousandsSeperator(json.counts.docCounts.dataset_landing_page + json.counts.docCounts.reference_tables);
        document.getElementById("totalCDIDs").innerHTML = thousandsSeperator(json.counts.docCounts.timeseries);
        document.getElementById("totalAdHocs").innerHTML = thousandsSeperator(json.counts.docCounts.static_adhoc);
    });

    $.getJSON("https://www.ons.gov.uk/topicspecificmethodology/data", function(json) {
        document.getElementById("totalMethodology").innerHTML = "HTML: " + json.result.docCounts.static_methodology + "<br>PDF: " + json.result.docCounts.static_methodology_download;
        document.getElementById("totalQMIs").innerHTML = json.result.docCounts.static_qmi;

    });

    $.getJSON("https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/publishedrequests/data", function(json) {
        document.getElementById("totalFOIs").innerHTML = json.result.numberOfResults;

    });
};

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    setTimeout(reloadChart,300);
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    setTimeout(reloadChart,300);
};

function reloadChart() {
    $('#upcomingReleases').highcharts().reflow();
};

generateChartData = function() {

	getReleaseData( function() {
		removeDuplicates( function() {
			removeDuplicates2( function() {
				getData( function() {
					buildMasterArray( function() {
						loadChart();
					});
				});
			});
		});
	});
};

loadBoxes();

generateChartData();

generateTodaysReleases();
generateUpcomingTable( function() {
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
});
generatePublishedTable( function() {
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
});

function roundHundred(value) {
    return Math.round(value / 100) * 100
};

get30DayAtAGlance = function() {
    last30URL = "https://www.ons.gov.uk/publications/data?sortBy=release_date&query=&filter=bulletin&filter=article&size=100";
    allDatasets = 0;
    allWords = 0;
    allChars = 0;
    allCharts = 0;
    allTables = 0;
    past30 = new Date();
    past30.setDate(past30.getDate() - 30.5);
    past30Days = new Date(past30);
    numberOfReleases = 0;
    allText = "";

    function generateAAG(callback) {
        $.getJSON(last30URL, function(json) {
            if (json.result.hasOwnProperty("results") != true) {
                console.log("Error: Non-standard template at https://www.ons.gov.uk" + json.uri);
            } else {
                for (var x = 0; x < json.result.results.length; x++) {

                    jsonDate = new Date((json.result.results[x].description.releaseDate).substr(0, 10));

                    if (jsonDate > past30Days) {
                        numberOfReleases += 1;
                        $.getJSON(("https://www.ons.gov.uk" + json.result.results[x].uri + "/data"), function(json) {
                            myJSON = json;
                            if (myJSON.hasOwnProperty("sections") != true) {
                                console.log("Error: Non-standard template at https://www.ons.gov.uk" + json.uri);
                            } else {
                                for (var s = 0; s < myJSON.sections.length; s++) {
                                    allText += myJSON.sections[s].markdown;
                                };
                            };
                            allWords = thousandsSeperator(roundHundred(allText.split(" ").length));
                            allChars = thousandsSeperator(roundHundred(allText.length));
                            allCharts += myJSON.charts.length + myJSON.images.length;
                            allTables += myJSON.tables.length;
                            allDatasets += myJSON.relatedData.length;
                            callback && callback();
                        });

                    };
                };

            };

        });
    };

    function printAAG() {
        document.getElementById("characterCount").innerHTML = ("</br>(approx. " + allChars + " characters)");
        document.getElementById("wordCount").innerHTML = allWords + " words";
        document.getElementById("chartTotal").innerHTML = (allCharts + " charts");
        document.getElementById("tableTotal").innerHTML = (allTables + " tables");
        document.getElementById("datasetTotal").innerHTML = ((allDatasets) + " datasets");
        document.getElementById("releaseNumber").innerHTML = numberOfReleases + " releases";

    };

    generateAAG(function() {
        printAAG();
    });

};

get30DayAtAGlance();
