var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNames[mToday.getMonth()];
var yToday = new Date;
var yearToday = yToday.getFullYear();

var dayToday = dateToday + ' ' + monthToday + ' ' + yearToday;

var dateArray = [];
var jsonDate;
//Get JSON data, loop through all results combining the title, URI and release date with HTML table formatting
$.getJSON("https://www.ons.gov.uk/search/data?q=AM+BB+BBSU+BERD+CAPSTK+CT+CXNV+DIOP+DRSI+EMP+IOS1+LMS+MM19+MM22+MM23+MQ10+MQ5+MRET+NFBS+OTT+PB+PGDP+PN2+PNBP+PPI+PRDY+PROF+PSE+PUSF+QNA+RGHI+SDQ7+SPPI+SRS+TOPSI+UKEA+UNEM&sortBy=relevance&filter=datasets&q=AM+BB+BBSU+BERD+CAPSTK+CT+CXNV+DIOP+DRSI+EMP+IOS1+LMS+MM19+MM22+MM23+MQ10+MQ5+MRET+NFBS+OTT+PB+PGDP+PN2+PNBP+PPI+PRDY+PROF+PSE+PUSF+QNA+RGHI+SDQ7+SPPI+SRS+TOPSI+UKEA+UNEM&size=50", function(json) {
    JSON = json;

    function myFunction(arr) {



        var JSONout = "";

        console.log(arr[0].result.results[0].description.title);
        console.log(arr[0].result.results[0].uri);
        console.log(arr[0].result.results[0].description.releaseDate);
        console.log(arr[0].result.results.length);
        console.log(arr[0].result.results[0].description.summary);


        for (var i = 0; i < arr[0].result.results.length; i++) {

            if (arr[0].result.results[i].description.nextRelease === "") {
                jsonDate = ("Not yet announced");
            } else {

                jsonDate = arr[0].result.results[i].description.nextRelease;
            };
            jsonTitle = arr[0].result.results[i].description.title;
            jsonTitle2 = jsonTitle.split("<strong>").join("");
            jsonTitle3 = jsonTitle2.split("</strong>").join("");

            if (arr[0].result.results[i].description.nextRelease != null) {
                dateArray = jsonDate.split(" ");
                dateArray = dateArray.filter(function(e) {
                    return e.replace(/(\r\n|\n|\r)/gm, "")
                });
                if (dateArray[0] > 0) {
                    if (dateArray[0] < 10) {
                        dateArray[0] = "0" + dateArray[0];
                    };
                    dateFormatted = dateArray[2].concat(monthNames.indexOf(dateArray[1]) + 1, dateArray[0]);

                };


                //Highlight todays releases

                if (jsonDate === dayToday) {
                    JSONout += '<tr style="color:red;"><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + jsonTitle3 + '</a></td>' + '<td class="tableData">' + jsonDate + '</td><td>' + dateFormatted + '</td><td>' + arr[0].result.results[i].description.summary + '</td><td>' + arr[0].result.results[i].description.metaDescription + '</td><td>' + arr[0].result.results[i].description.keywords + '</td><td>' + arr[0].result.results[i].description.datasetId + '</td></tr>';
                } else {
                    JSONout += '<tr><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + jsonTitle3 + '</a></td>' + '<td class="tableData">' + jsonDate + '</td><td>' + dateFormatted + '</td><td>' + arr[0].result.results[i].description.summary + '</td><td>' + arr[0].result.results[i].description.metaDescription + '</td><td>' + arr[0].result.results[i].description.keywords + '</td><td>' + arr[0].result.results[i].description.datasetId + '</td></tr>';
                };

                document.getElementById("publishedreleases").innerHTML = JSONout;
                dateFormatted = "";

            };
            document.body.innerHTML = document.body.innerHTML.replace('undefined', 'Not yet announced');



        };
    };

    myFunction([
        JSON
    ]);


    function sortNumbersIgnoreText(a, b, high) {
        var reg = /[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?[0-9]+)?/;
        a = a.match(reg);
        a = a !== null ? parseFloat(a[0]) : high;
        b = b.match(reg);
        b = b !== null ? parseFloat(b[0]) : high;
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    }
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "sort-numbers-ignore-text-asc": function(a, b) {
            return sortNumbersIgnoreText(a, b, Number.POSITIVE_INFINITY);
        },
        "sort-numbers-ignore-text-desc": function(a, b) {
            return sortNumbersIgnoreText(a, b, Number.NEGATIVE_INFINITY) * -1;
        }
    });

    $('#chartTable').dataTable({
        "pageLength": 20,
        "lengthChange": false,
        "order": [
            [2, "asc"],
            [0, "asc"]
        ],
        

        "columnDefs": [{
            type: 'sort-numbers-ignore-text',
            targets: 2
        }, {
            "visible": false,
            "targets": [2, 3, 4, 5, 6],
            "searchable": true
        }, {
            "iDataSort": 2,
            "aTargets": 1,
        }]

    });


});
