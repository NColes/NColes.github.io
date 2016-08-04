var newPathname = "";
var JSONURL = "";

assemble = function() {
    myURL = "";
    myURL2 = "";
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

        if (pathArray[pathArray.length - 1] === "latest") {
            JSONURL = myURL + "/data";
        } else if (pathArray[pathArray.length - 2] === "datasets") {
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
            newPathname += "/latest";
            JSONURL = "https://www.ons.gov.uk" + newPathname + "/data";
            console.log(newPathname);
        };
        document.getElementById("metadata").style.display="block";
    };
    

};
