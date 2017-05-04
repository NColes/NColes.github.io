function thousandsSeperator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function roundHundred(value) {
    return Math.round(value / 100) * 100
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
        for (var x = 0; x < myJSON.charts.length; x++) {
            chartArray = [];
            chartLink = 'https://www.ons.gov.uk' + myJSON.charts[x].uri + '/data';

            $.getJSON(chartLink, function(json) {
                chartBuilderType = "";
                if (json.chartType === "rotated") {
                    chartBuilderType = "Rotated bar";
                } else if (json.chartType === "line") {
                    chartBuilderType = "Line";
                } else if (json.chartType === "barline") {
                    chartBuilderType = "Bar and line";
                } else if (json.chartType === "bar") {
                    chartBuilderType = "Bar";
                } else {
                    chartBuilderType = json.chartType;
                };
                chartInfo = '<tr><td>' + json.title + '</td>' + '<td>' + json.subtitle + '</td>' + '<td>' + json.source + '</td>' + '<td>' + json.unit + '</td>' + '<td>' + json.altText + '</td>' + '<td><a href="https://www.ons.gov.uk' + json.uri + '" target="_blank">' + chartBuilderType + '</a></td></tr>';
                chartArray.push(chartInfo);
                chartArray.sort(naturalCompare);
                document.getElementById("allcharts").innerHTML = chartArray.join("");
            });

        };
    };

    if (myJSON.images.length > 0) {
        for (var n = 0; n < myJSON.images.length; n++) {
            imageLink = 'https://www.ons.gov.uk' + myJSON.images[n].uri + '/data';
            $.getJSON(imageLink, function(json) {
                imageInfo = '<tr>' + '<td>' + json.title + '</td>' + '<td>' + json.subtitle + '</td>' + '<td>' + json.source + '</td>' + '<td>N/A</td>' + '<td>' + json.altText + '</td>' + '<td><a href="https://www.ons.gov.uk/resource?uri=' + json.uri + '.png" target="_blank">Image</a></td></tr>';
                chartArray.push(imageInfo);
                chartArray.sort(naturalCompare);
                document.getElementById("allcharts").innerHTML = chartArray.join("");
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
    document.getElementById("timeseriesTotal").innerHTML = (TSDArray.length + " timeseries datasets.");
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
            getRelatedData( function(){
                getDatasetNumbers();
            });
        };

        if (myJSON.type === "article") {
            document.getElementById("dEdition").innerHTML = myJSON.description.edition;
            getRelatedArticles();
            getSections();
            getChartsTables();
            getTaxonomy();
            getRelatedData( function(){
                getDatasetNumbers();
            });
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
