getMetadata = function() {
    $.getJSON(JSONURL, function(json) {
        myJSON = json;
        console.log(myJSON.description.title);

        document.getElementById("dTitle").innerHTML = myJSON.description.title;
        document.getElementById("dType").innerHTML = myJSON.type;
        document.getElementById("dMeta").innerHTML = myJSON.description.metaDescription;
        document.getElementById("dEmail").innerHTML = myJSON.description.contact.email;
        document.getElementById("dName").innerHTML = myJSON.description.contact.name;
        document.getElementById("dPhone").innerHTML = myJSON.description.contact.telephone;

        if (myJSON.description.keywords.length > 0) {
            keywordsArray = [];
            keywordsArray = myJSON.description.keywords[0].split(",");

            function uniq_fast(keywordsArray) {
                var seen = {};
                var out = [];
                var len = keywordsArray.length;
                var j = 0;
                for (var i = 0; i < len; i++) {
                    var item = keywordsArray[i];
                    if (seen[item] !== 1) {
                        seen[item] = 1;
                        out[j++] = item;
                    }
                }
                return out;
            };
            document.getElementById("dKeywords").innerHTML = keywordsArray.join("<br>");
        } else {
            document.getElementById("dKeywords").innerHTML = "No keywords"
        };


        if (myJSON.description.nationalStatistic = true) {
            document.getElementById("descNS").innerHTML = "Yes";
        } else {
            document.getElementById("descNS").innerHTML = "No";
        };

        document.getElementById("dNext").innerHTML = myJSON.description.nextRelease;

        if (myJSON.type === "bulletin") {
            if (myJSON.relatedBulletins.length > 0) {

                for (var t = 0; t < myJSON.relatedBulletins.length; t++) {
                    relatedBulls = '<p>' + myJSON.relatedBulletins[t].title + '</p>';
                    document.getElementById("rBulletins").innerHTML = relatedBulls;
                };
            };



            for (var d = 0; d < myJSON.relatedData.length; d++) {
                dataArray = [];
                linkArray = [];
                linkArray.push('<p><a href="https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '">');
                relDataLink = 'https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '/data';

                $.getJSON(relDataLink, function(json) {
                    relData = '<p>' + json.description.title + '</p>';
                    dataArray.push(relData);
                    dataArray.sort(naturalCompare);
                    document.getElementById("rData").innerHTML = dataArray.join("");
                });


            };


        };



        if (myJSON.type === "article") {
            if (myJSON.relatedArticles.length > 0) {

                for (var t = 0; t < myJSON.relatedArticles.length; t++) {
                    relatedArt = '<p>' + myJSON.relatedArticles[t].title + '</p>';
                    document.getElementById("rBulletins").innerHTML = relatedArt;
                };
            };

            for (var d = 0; d < myJSON.relatedData.length; d++) {
                dataArray = [];
                linkArray = [];
                linkArray.push('<p><a href="https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '">');
                relDataLink = 'https://www.ons.gov.uk' + myJSON.relatedData[d].uri + '/data';

                $.getJSON(relDataLink, function(json) {
                    relData = '<p>' + json.description.title + '</p>';
                    dataArray.push(relData);
                    dataArray.sort(naturalCompare);
                    document.getElementById("rData").innerHTML = dataArray.join("");
                });


            };
        };


        if (myJSON.type.substr(0, 7) != "dataset") {

            chartsArray = [];
            tablesArray = [];
            document.getElementById("dEdition").innerHTML = myJSON.description.edition;


            sectionsList = "";
            for (var i = 0; i < myJSON.sections.length; i++) {

                sectionsList += '<li>' + myJSON.sections[i].title + '</li>';
                document.getElementById("sections").innerHTML = sectionsList;
            };


            accordionList = "";
            for (var j = 0; j < myJSON.accordion.length; j++) {

                accordionList += '<li>' + myJSON.accordion[j].title + '</li>';
                document.getElementById("accordion").innerHTML = accordionList;
            };



            for (var x = 0; x < myJSON.charts.length; x++) {
                tempChart = '<p>' + myJSON.charts[x].title + '</p>';
                chartsArray.push(tempChart);
            };

            if (myJSON.images.length > 0) {

                var n;
                for (n = 0; n < myJSON.images.length; n++) {
                    tempImage = '<p>' + myJSON.images[n].title + ' <strong>(image)</strong></p>';
                    chartsArray.push(tempImage);
                };
            };
            chartsArray.sort(naturalCompare);
            document.getElementById("allcharts").innerHTML = chartsArray.join("");


            for (var z = 0; z < myJSON.tables.length; z++) {
                tempTable = '<p>' + myJSON.tables[z].title + '</p>';
                tablesArray.push(tempTable);
            };
            tablesArray.sort(naturalCompare);
            document.getElementById("alltables").innerHTML = tablesArray.join("");

        };




    })

.error(function() { swal({
  title: "Error!",
  text: "That is not a valid bulletin, article or dataset link.",
  type: "error",
  confirmButtonText: "Try again"
}); });


};