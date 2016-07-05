var newPathname = "";


assemble = function() {
    myURL = "";
    myURL2 = "";
    newPathname = "";
    pathArray = "";
    myURL = document.getElementById("URLName").value;

    if (myURL === "") {
                swal({
            title: "Woops!",
            text: "Looks like you forgot to put a URL in.",
            type: "error",
            confirmButtonText: "Try again"
        });
    } else {


        if (myURL.substr(myURL.length - 6) === "latest") {
            newPathname = myURL;
        } else {
            if (myURL.substr(0, 5) === "https") {
                myURL2 = myURL.replace("https://www.ons.gov.uk/", "");
            } else {
                if (myURL.substr(0, 4) === "http") {
                    myURL2 = myURL.replace("http://www.ons.gov.uk/", "");
                } else {
                    if (myURL.substr(0, 3) === "www") {
                        myURL2 = myURL.replace("www.ons.gov.uk/", "");
                    } else {
                        if (myURL.substr(0, 10) === "ons.gov.uk") {
                            myURL2 = myURL.replace("ons.gov.uk/", "");
                        };
                    };
                };
            };
            pathArray = myURL2.split("/");
            secondLevelLocation = pathArray[0];
            for (i = 0; i < pathArray.length - 1; i++) {
                newPathname += "/";
                newPathname += pathArray[i];
            };

            newPathname += "/latest";

        };

        console.log(newPathname);
        JSONURL = "https://www.ons.gov.uk" + newPathname + "/data";
    };
};