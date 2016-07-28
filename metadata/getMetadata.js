basicMetadata = function() {
    document.getElementById("dTitle").innerHTML = myJSON.description.title;
    document.getElementById("dType").innerHTML = myJSON.type;
    document.getElementById("dMeta").innerHTML = myJSON.description.metaDescription;
    document.getElementById("dEmail").innerHTML = myJSON.description.contact.email;
    document.getElementById("dName").innerHTML = myJSON.description.contact.name;
    document.getElementById("dPhone").innerHTML = myJSON.description.contact.telephone;
    document.getElementById("dNext").innerHTML = myJSON.description.nextRelease;
monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("dPubl").innerHTML = myJSON.description.releaseDate.substring(8, 10) + " " + monthNames[myJSON.description.releaseDate.substring(5, 7) - 1] + " " + myJSON.description.releaseDate.substring(0, 4);

    if (myJSON.type === "article") {
        document.getElementById("dSumm").innerHTML = myJSON.description._abstract;
    } else {
        document.getElementById("dSumm").innerHTML = myJSON.description.summary;
    };
    if (myJSON.description.nationalStatistic === true) {
        document.getElementById("descNS").innerHTML = "Yes";
    } else if (myJSON.description.nationalStatistic === false) {
        document.getElementById("descNS").innerHTML = "No";
    };
};

getKeywords = function() {
    if (myJSON.description.keywords.length > 0) {
        keywordsArray = [];
        keywordsOut = [];
        keywordsArray = myJSON.description.keywords[0].split(",");
        document.getElementById("dKeywords").innerHTML = keywordsArray.join("<br>");
    } else {
        document.getElementById("dKeywords").innerHTML = "No keywords"
    };
};

getRelatedBulletins = function() {
    if (myJSON.relatedBulletins.length > 0) {

        for (var t = 0; t < myJSON.relatedBulletins.length; t++) {
            relatedBulls = '<p>' + myJSON.relatedBulletins[t].title + '</p>';
            document.getElementById("rBulletins").innerHTML = relatedBulls;
        };
    };
};

getRelatedData = function() {
    for (var d = 0; d < myJSON.relatedData.length; d++) {
        dataArray = [];
        linkArray = [];
        linkArray.push('<a href="https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '">');
        relDataLink = 'https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '/data';
        $.getJSON(relDataLink, function(json) {
            relData = '<tr>' + '<td><a href="https://www.ons.gov.uk' + json.uri + '" target="_blank">' + json.description.title + '</a></td>' + '<td>' + json.description.summary + '</td>' + '</tr>';
            dataArray.push(relData);
            dataArray.sort(naturalCompare);
            document.getElementById("rData").innerHTML = dataArray.join("");
        });


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
    chartsArray = [];
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
                chartsArray.push(imageInfo);
                chartsArray.sort(naturalCompare);
                document.getElementById("allcharts").innerHTML = chartArray.join("");
            });
        };
    };

    chartsArray.sort(naturalCompare);
    
    if (myJSON.tables.length > 0) {
        for (var z = 0; z < myJSON.tables.length; z++) {
            tempTable = '<tr><td>' + myJSON.tables[z].title + '</td></tr>';
            tablesArray.push(tempTable);
        };

        tablesArray.sort(naturalCompare);
        document.getElementById("alltables").innerHTML = tablesArray.join("");
    };
};


getMetadata = function() {
    $.getJSON(JSONURL, function(json) {
        myJSON = json;
        basicMetadata();
        getKeywords();

        if (myJSON.type === "bulletin") {
            getRelatedBulletins();
            getRelatedData();
            document.getElementById("dEdition").innerHTML = myJSON.description.edition;
            getSections();
            getChartsTables();

        };

        if (myJSON.type === "article") {
            document.getElementById("dEdition").innerHTML = myJSON.description.edition;
            getRelatedArticles();
            getRelatedData();
            getSections();
            getChartsTables();
        };

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
