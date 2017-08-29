$('#URLName').keypress(function(event) {
    if (event.keyCode == 13) {
        $('#checkURL').click();
    }
});

var newPathname = "";
var JSONURL = "";
var previousPath = ""

clearContent = function() {
    document.getElementById("contentBox").innerHTML = `<div class="row marketing">
            <div id="atAGlance" style="display:none;">
                <h4>At a glance</h4>
                <div id="atAGlanceContent">
                    <table>
                        <tbody>
                            <tr>
                                <td style="min-width:150px">Title</td>
                                <td><span id="aTitle"></span><span id="aEdition"></span></td>
                            </tr>

                            <tr>
                                <td>Number of editions</td>
                                <td id="previousVersions"></td>
                            </tr>
                            <tr>
                                <td>Length</td>
                                <td><span id="wordCount"></span> <span id="characterCount"></span></td>
                            </tr>
                            <tr>
                                <td>Total charts</td>
                                <td id="chartTotal"></td>
                            </tr>
                            <tr>
                                <td>Total tables</td>
                                <td id="tableTotal"></td>
                            </tr>
                            <tr>
                                <td>Datasets</td>
                                <td><span id="datasetTotal"></span> <span id="timeseriesTotal"></span></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

            <div id="metadata" style="display:none;">
                <h3>Release metadata</h3>

                  <table class="table table-hover">
                    <tbody>
                        <tr>
                            <td style="width:200px;">Title</td>
                            <td style="width:600px;" id="dTitle"></td>
                        </tr>
                        <tr>
                            <td>Edition</td>
                            <td id="dEdition"></td>
                        </tr>
                        <tr>
                            <td>Release date</td>
                            <td id="dPubl"></td>
                        </tr>
                        <tr>
                            <td>Next release date</td>
                            <td id="dNext">No next release date.</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td id="dType"></td>
                        </tr>
                        <tr>
                            <td>Taxonomy</td>
                            <td id="dTax"></td>
                        </tr>
                        <tr>
                            <td>Contact details</td>
                            <td>Name:
                                <div id="dName" style="display:inline;"></div><br>Email:
                                <div id="dEmail" style="display:inline;"></div><br>Telephone:
                                <div id="dPhone" style="display:inline;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Summary or abstract</td>
                            <td id="dSumm">No summary or abstract.</td>
                        </tr>
                        <tr>
                            <td>Metadescription</td>
                            <td id="dMeta">No metadescription.</td>
                        </tr>
                        <tr>
                            <td>Keywords</td>
                            <td id="dKeywords">No keywords.</td>
                        </tr>
                        <tr>
                            <td>National Statistics</td>
                            <td id="descNS"></td>
                        </tr>
                        <tr>
                            <td>PDF reference tables</td>
                            <td id="descPDF"></td>
                        </tr>
                    </tbody>
                </table>

                <h3>Sections</h3>

                <ol>
                    <div id="sections"></div>
                    <div id="accordion"></div>
                </ol>

                <h3>Charts or images</h3>
          <table class="table table-hover">
            <thead>
              <tr>
                <th data-title="Title">Title</th>
                <th data-title="Subtitle">Subtitle</th>
                <th data-title="Source">Source</th>
                <th data-title="Units">Units</th>
                <th data-title="Alt text">Alt text</th>
                <th data-title="Type">Type</th>
                <th data-title="chartID">Chart ID</th>
              </tr>
              </th>
            </thead>
            <tbody id="allcharts">
              <td colspan="6">No charts.</td>

            </tbody>
          </table>
                <h4>Tables</h4>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody id="alltables">
                        <tr>
                            <td>No tables.</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Related datasets</h3>

                <table class="table table-hover">
                    <thead>
                        <th>Title</th>
                        <th>Summary
                            <th>
                    </thead>
                    <tbody id="rData">
                        <tr>
                            <td colspan="2">No related data.</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Related timeseries</h3>

		<div id="rTSD">No related timeseries.</div>
            </div>
        </div>`;
};

assemble = function() {
    clearContent();
    myURL = "";
    newPathname = "";
    pathArray = [];
    myURL = document.getElementById("URLName").value;

    if (myURL === "") {
        swal({
            title: "Woops!",
            text: "Looks like you forgot to put a URL in.",
            type: "error",
            confirmButtonText: "Try again"
        });
    } else {

        pathArray = myURL.split("/");

        if (pathArray[pathArray.length - 2] === "datasets") {
            JSONURL = myURL + "/data";
        } else {

            if (myURL.substr(0, 5) === "https") {
                pathArray.splice(0, 3);

            } else
            if (myURL.substr(0, 4) === "http") {
                pathArray.splice(0, 3);

            } else
            if (myURL.substr(0, 3) === "www") {
                pathArray.splice(0, 1);
            } else
            if (myURL.substr(0, 10) === "ons.gov.uk") {
                pathArray.splice(0, 1);
            };

            for (i = 0; i < pathArray.length - 1; i++) {
                newPathname += "/";
                newPathname += pathArray[i];
            };

            previousPath = "https://www.ons.gov.uk/" + newPathname + "/previousReleases/data";

            if (document.getElementById("showLatest").checked == true) {
                newPathname += "/latest";
            } else {
                newPathname += "/" + pathArray[(pathArray.length - 1)];
            };

            JSONURL = "https://www.ons.gov.uk" + newPathname + "/data";
            console.log(newPathname);
        };
        document.getElementById("metadata").style.display = "block";
    };
};
