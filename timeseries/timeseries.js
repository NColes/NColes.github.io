var myJSON;
var jsonDate;
var jsonMonth;
var jsonYear;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dToday = new Date;
var dateToday = dToday.getDate();
var mToday = new Date;
var monthToday = monthNames[mToday.getMonth()];
var yToday = new Date;
var yearToday = yToday.getFullYear();

var dayToday = dateToday + ' ' + monthToday + ' ' + yearToday;


//Get JSON data, loop through all results combining the title, URI and release date with HTML table formatting
$.getJSON("https://www.ons.gov.uk/search/data?q=AM+BB+BBSU+BERD+CAPSTK+CT+CXNV+DIOP+DRSI+EMP+IOS1+LMS+MM19+MM22+MM23+MQ10+MQ5+MRET+NFBS+OTT+PB+PGDP+PN2+PNBP+PPI+PRDY+PROF+PSE+PUSF+QNA+RGHI+SDQ7+SPPI+SRS+TOPSI+UKEA+UNEM&sortBy=relevance&filter=datasets&q=AM+BB+BBSU+BERD+CAPSTK+CT+CXNV+DIOP+DRSI+EMP+IOS1+LMS+MM19+MM22+MM23+MQ10+MQ5+MRET+NFBS+OTT+PB+PGDP+PN2+PNBP+PPI+PRDY+PROF+PSE+PUSF+QNA+RGHI+SDQ7+SPPI+SRS+TOPSI+UKEA+UNEM&size=50", function(json) {
    JSON = json;

    function myFunction(arr) {

        var JSONout = "";
        var i;
	var jsonTitle;
	var jsonTitle2;
	var jsonTitle3;
        console.log(arr[0].result.results[0].description.title);
        console.log(arr[0].result.results[0].uri);
        console.log(arr[0].result.results[0].description.releaseDate);
        console.log(arr[0].result.results.length);


        for (i = 0; i < arr[0].result.results.length; i++) {
if (arr[0].result.results[i].description.nextRelease === "" || arr[0].result.results[i].description.nextRelease === null) {
	jsonDate = "Not yet announced";
} else {

	jsonDate = arr[0].result.results[i].description.nextRelease;
};
	    jsonTitle = arr[0].result.results[i].description.title;
	    jsonTitle2 = jsonTitle.split("<strong>").join("");
	    jsonTitle3 = jsonTitle2.split("</strong>").join("");

	
            //Highlight todays releases

            if (jsonDate === dayToday) {
                JSONout += '<tr style="color:red;"><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + jsonTitle3 + '</a></td>' + '<td class="tableData">' + jsonDate + '</td></tr>';
            } else {
                JSONout += '<tr><td><a href="https://www.ons.gov.uk' + arr[0].result.results[i].uri + '">' + jsonTitle3 + '</a></td>' + '<td class="tableData">' + jsonDate + '</td></tr>';
            };

            document.getElementById("publishedreleases").innerHTML = JSONout;

            };
document.body.innerHTML = document.body.innerHTML.replace('undefined', 'Not yet announced');
        };



    myFunction([
        JSON
    ]);
    $(document).ready(function() {
    $('#chartTable').DataTable( {
        "order": [[ 0, "asc" ]],         
"bLengthChange": false,
"paging":false
    } );
} );

});