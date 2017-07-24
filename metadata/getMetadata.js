function thousandsSeperator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function roundHundred(value) {
    return Math.round(value / 100) * 100
};

copyID = function(id) {
  document.getElementById(id).select();
  document.execCommand('copy');
  swal("Done!", "The chart ID has been copied to your clipboard.", "success")
};

basicMetadata = function() {
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.getElementById("dTitle").innerHTML = myJSON.description.title;
    document.getElementById("dType").innerHTML = myJSON.type.substring(0, 1).toUpperCase() + myJSON.type.substring(1);
    document.getElementById("dMeta").innerHTML = myJSON.description.metaDescription;
    document.getElementById("dEmail").innerHTML = myJSON.description.contact.email;
    document.getElementById("dName").innerHTML = myJSON.description.contact.name;
    document.getElementById("dPhone").innerHTML = myJSON.description.contact.telephone;
    document.getElementById("dNext").innerHTML = myJSON.description.nextRelease;
    if ((new Date).getTimezoneOffset() != -60) {
        document.getElementById("dPubl").innerHTML = Number(myJSON.description.releaseDate.substring(8, 10)) + " " + monthNames[myJSON.description.releaseDate.substring(5, 7) - 1] + " " + myJSON.description.releaseDate.substring(0, 4);    
    } else {
        document.getElementById("dPubl").innerHTML = (Number(myJSON.description.releaseDate.substring(8, 10)) + 1) + " " + monthNames[myJSON.description.releaseDate.substring(5, 7) - 1] + " " + myJSON.description.releaseDate.substring(0, 4);
    }

    if (myJSON.type === "article") {
        document.getElementById("dSumm").innerHTML = myJSON.description._abstract;
    } else {
        document.getElementById("dSumm").innerHTML = myJSON.description.summary;
    };
    if (myJSON.description.nationalStatistic === true) {
        document.getElementById("descNS").innerHTML = "&#10003; Yes";
    } else if (myJSON.description.nationalStatistic === false) {
        document.getElementById("descNS").innerHTML = "&#10007; No";
    };
};

getKeywords = function() {
    if (myJSON.description.keywords.length > 0) {
        keywordsArray = [];
        keywordsOut = [];
        thisKeyword = "";
        for (var i = 0; i < myJSON.description.keywords.length; i++) {
            thisKeyword = myJSON.description.keywords[i];
            keywordsArray.push(thisKeyword);
        };
        document.getElementById("dKeywords").innerHTML = keywordsArray.join("<br>");
    } else {
        document.getElementById("dKeywords").innerHTML = "No keywords"
    };
};

getTaxonomy = function() {
    taxonomy = "";
    if (myJSON.type === "dataset_landing_page") {
        for (var i = 3; i < pathArray.length - 2; i++) {
            taxonomy += '<div id="taxonomy">' + pathArray[i] + '</div>';
        };
    } else {

        for (var i = 0; i < pathArray.length - 3; i++) {
            taxonomy += '<div id="taxonomy">' + pathArray[i] + '</div>';
        };
    };

    document.getElementById("dTax").innerHTML = taxonomy;
};

getRelatedBulletins = function() {
    if (myJSON.relatedBulletins.length > 0) {

        for (var t = 0; t < myJSON.relatedBulletins.length; t++) {
            relatedBulls = '<p>' + myJSON.relatedBulletins[t].title + '</p>';
            document.getElementById("rBulletins").innerHTML = relatedBulls;
        };
    };
};

getRelatedData = function(callback) {
    //Check for PDFs
    if (myJSON.pdfTable != "") {
        document.getElementById("descPDF").innerHTML = "&#10003; This release contains PDF reference tables";
    } else {
        document.getElementById("descPDF").innerHTML = "&#10007; This release does not contain PDF reference tables";
    };

    for (var d = 0; d < myJSON.relatedData.length; d++) {
    dataArray = [];
    linkArray = [];
    TSDArray = [];
    for (var d = 0; d < myJSON.relatedData.length; d++) {
        linkArray.push('<a href="https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '">');
        $.getJSON('https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '/data', function(json) {
            if (json.description.title.indexOf("timeseries") != -1 || json.description.title.indexOf("time series") != -1) {
                TSDKeywords = "";

                if (json.hasOwnProperty("keywords") === true) {

                    if (json.description.keywords.length == 0) {
                        TSDKeywords = "No keywords.";
                    } else {
                        TSDKeywords = json.description.keywords.join("<br>");
                    };
                } else {
                    TSDKeywords = "No keywords.";
                };

                if (json.description.nationalStatistic === true) {
                    NSStatus = "&#10003; Yes";
                } else if (json.description.nationalStatistic === false) {
                    NSStatus = "&#10007; No";
                };
                
                if (json.section.hasOwnProperty("markdown")) {
                    if (json.sectionmarkdown != "") {
                        timeseriesNotes = (json.section.markdown).replace(/\n/g, "<br>");
                    };      
                } else {
                    timeseriesNotes = "No notes.";
                };
                relData = '<table class="table table-hover"><thead><tr><td colspan="2"><h4 style="padding-left:0px;"><a href="https://www.ons.gov.uk' + json.uri + '" target="_blank">' + json.description.title + '</a></h4></td></tr></thead><tbody><tr><td style="width:130px;">Summary</td><td>' + json.description.summary + '</td></tr><tr><td>Contact</td><td>' + json.description.contact.name + '</br>' + json.description.contact.email + '</br>' + json.description.contact.telephone + '</td></tr><tr><td>Dataset ID</td><td>' + json.description.datasetId + '</td></tr><tr><td>National statistic</td><td>' + NSStatus + '</td></tr><tr><td>Keywords</td><td>' + TSDKeywords + '</td></tr><tr><td>Metadescription</td><td>' + json.description.metaDescription + '</td></tr><tr><td>Notes</td><td>' + timeseriesNotes + '</td></tr></tbody></table>';
                TSDArray.push(relData);
                document.getElementById("rTSD").innerHTML = TSDArray.join("");
            } else {
                relData = '<tr><td><a data-name="' + json.description.title + '" href="https://www.ons.gov.uk' + json.uri + '" target="_blank">' + json.description.title + '</a></td>' + '<td>' + json.description.summary + '</td>' + '</tr>';
                dataArray.push(relData);
                dataArray.sort(naturalCompare);
                document.getElementById("rData").innerHTML = dataArray.join("");
            };
            callback && callback();
        });
    };
};
    
};

getRelatedArticles = function() {
    if (myJSON.relatedArticles != null) {
        if (myJSON.relatedArticles.length > 0) {
            for (var t = 0; t < myJSON.relatedArticles.length; t++) {
                relatedArt = '<p>' + myJSON.relatedArticles[t].title + '</p>';
                document.getElementById("rBulletins").innerHTML = relatedArt;
            };
        };
    };
};

getSections = function() {
    sectionsList = "";
    for (var i = 0; i < myJSON.sections.length; i++) {
        sectionsList += '<li>' + myJSON.sections[i].title + '</li>';
    };
    document.getElementById("sections").innerHTML = sectionsList;
    accordionList = "";
    for (var j = 0; j < myJSON.accordion.length; j++) {
        accordionList += '<li>' + myJSON.accordion[j].title + '</li>';
        document.getElementById("accordion").innerHTML = accordionList;
    };
};

getChartsTables = function() {
  tablesArray = [];
  if (myJSON.charts.length > 0) {
    for (x = 0; x < myJSON.charts.length; x++) {
      chartArray = [];
      chartLink = 'https://www.ons.gov.uk' + myJSON.uri + '/' + myJSON.charts[x].filename + '/data';

      $.getJSON(chartLink, function(json) {
        chartBuilderType = "";
        imageSource = "<img width=&#39;300px&#39; src=&#39;https://www.ons.gov.uk/chartimage?uri=" + json.uri + "&#39;>";
        chartBuilderType = json.chartType.replace(/-/i, " ");
        chartInfo = '<tr data-label="' + json.title.substring(0, 10).trim() + '"><td data-title="Title">' +  json.title + '<a href="https://www.ons.gov.uk' + json.uri + '" style="display:inline;" target="_blank" data-toggle="tooltip" title="' + imageSource + '"><img src="chart.svg" style="border:0px;"></a></td>' + '<td data-title="Subtitle">' + json.subtitle + '</td>' + '<td data-title="Source">' + json.source + '</td>' + '<td data-title="Units">' + json.unit + '</td>' + '<td data-title="Alt text">' + json.altText + '</td>' + '<td data-title="Type">' + chartBuilderType + '</td><td data-title="Chart ID">' + json.filename + '  <textarea style="position:absolute;left:-9999em" id="' + json.filename + '">' + json.uri + '</textarea><button class="standardButton" onclick=copyID("' + json.filename + '");>Copy</button></td></tr>';
        chartArray.push(chartInfo);
        chartArray.sort(naturalCompare);
        document.getElementById("allcharts").innerHTML = chartArray.join("");
        $('[data-toggle="tooltip"]').tooltip({
          animated: 'fade',
          placement: 'bottom',
          html: true
        });
      });

    };

  };

  if (myJSON.images.length > 0) {
    for (n = 0; n < myJSON.images.length; n++) {
      imageLink = 'https://www.ons.gov.uk' + myJSON.uri + '/' + myJSON.images[n].filename + '/data';
      $.getJSON(imageLink, function(json) {
        for (y = 0; y < json.files.length; y++) {
            if (json.files[y].type === 'uploaded-image') {
                imageSource2 = "<img width=&#39;300px&#39; src=&#39;https://www.ons.gov.uk/resource?uri=" + myJSON.uri + "/" + json.files[y].filename + "&#39;>";
                imageInfo = '<tr data-label="' + json.title.substring(0, 10).trim() + '"><td data-title="Title">' + json.title + '<a href="https://www.ons.gov.uk/resource?uri=' + myJSON.uri + '/' + json.files[y].filename + '" target="_blank" data-toggle="tooltip" title="' + imageSource2 + '"><img src="chart.svg" style="border:0px;"></a></td>' + '<td data-title="Subtitle">' + json.subtitle + '</td>' + '<td data-title="Source">' + json.source + '</td>' + '<td data-title="Units">N/A</td>' + '<td data-title="Alt text">' + json.altText + '</td>' + '<td data-title="Type">Image</td><td></td></tr>';
                break;
            } else {
            }
        }
        chartArray.push(imageInfo);
        chartArray.sort(naturalCompare);
        document.getElementById("allcharts").innerHTML = chartArray.join("");
        $('[data-toggle="tooltip"]').tooltip({
          animated: 'fade',
          placement: 'bottom',
          html: true
        });
      });
    };
  };

    
    

    if (myJSON.tables.length > 0) {
        for (var z = 0; z < myJSON.tables.length; z++) {
            tempTable = '<tr><td>' + myJSON.tables[z].title + '</td></tr>';
            tablesArray.push(tempTable);
        };

        tablesArray.sort(naturalCompare);
        document.getElementById("alltables").innerHTML = tablesArray.join("");
    };
};

getAtAGlance = function(callback) {

    document.getElementById("atAGlance").style.display = "";
    document.getElementById("aTitle").innerHTML = myJSON.description.title + ": ";

    var allWords = "";
    for (var s = 0; s < myJSON.sections.length; s++) {
        allWords += myJSON.sections[s].markdown;
    };
    allWords = allWords.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

    if (myJSON.type === "bulletin") {

        document.getElementById("aEdition").innerHTML = myJSON.description.edition;
        document.getElementById("characterCount").innerHTML = ("(" + thousandsSeperator(roundHundred(allWords.length)) + " characters).");
        document.getElementById("wordCount").innerHTML = (thousandsSeperator(roundHundred(allWords.split(" ").length)) + " words ");
        document.getElementById("chartTotal").innerHTML = ((myJSON.charts.length + myJSON.images.length) + " charts.");
        document.getElementById("tableTotal").innerHTML = (myJSON.tables.length + " tables.");
        
        $.getJSON(previousPath, function(json) {
            document.getElementById("previousVersions").innerHTML = json.result.numberOfResults + " editions";
            callback && callback();
        });

    } else if (myJSON.type === "article") {
        document.getElementById("aEdition").innerHTML = myJSON.description.edition;
        document.getElementById("characterCount").innerHTML = ("(" + thousandsSeperator(roundHundred(allWords.length)) + " characters).");
        document.getElementById("wordCount").innerHTML = (thousandsSeperator(roundHundred(allWords.split(" ").length)) + " words ");
        document.getElementById("chartTotal").innerHTML = ((myJSON.charts.length + myJSON.images.length) + " charts.");
        document.getElementById("tableTotal").innerHTML = (myJSON.tables.length + " tables.");
        
        $.getJSON(previousPath, function(json) {
            document.getElementById("previousVersions").innerHTML = json.result.numberOfResults + " editions";
            callback && callback();
        });
    };
};

getDatasetNumbers = function() {
    document.getElementById("datasetTotal").innerHTML = ((myJSON.relatedData.length - TSDArray.length) + " datasets,");
};

getMetadata = function() {
    $.getJSON(JSONURL, function(json) {
        myJSON = json;
        basicMetadata();
        getKeywords();

        if (myJSON.type === "bulletin") {
            getRelatedBulletins();
            document.getElementById("dEdition").innerHTML = myJSON.description.edition;
            getSections();
            getChartsTables();
            getTaxonomy();
            getDatasetNumbers();
            getRelatedData();
        };

        if (myJSON.type === "article") {
            document.getElementById("dEdition").innerHTML = myJSON.description.edition;
            getRelatedArticles();
            getSections();
            getChartsTables();
            getTaxonomy();
            getDatasetNumbers();
            getRelatedData();
        };

        if (myJSON.type === "dataset_landing_page") {
            getTaxonomy();
        };

        getAtAGlance();
    })

    .error(function() {
        swal({
            title: "Uh-oh!",
            text: "That is not a valid bulletin, article or dataset link.",
            type: "error",
            confirmButtonText: "Try again"
        });
    });


};
