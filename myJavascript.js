document.getElementById("pullDown").addEventListener("click", loadMenu);
// Load XML to memory
function loadMenu(){
var xmlhttpCinemas = new XMLHttpRequest();
// We replace the statif file with URL
//
xmlhttpCinemas.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
xmlhttpCinemas.send();
xmlhttpCinemas.onreadystatechange = function () {
    // If we are still loading...
    if (xmlhttpCinemas.readyState === 1) {
        document.getElementById("theaters").innerHTML = "Loading...";
    }
    // If everything is ok
    if (xmlhttpCinemas.readyState === 4 && xmlhttpCinemas.status === 200) {
        // Instead of just placing the RAW XML content we need to parse it
        //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        //
        var xmlDocCinemas = xmlhttpCinemas.responseXML;
        console.log(xmlDocCinemas);
        var items = xmlDocCinemas.getElementsByTagName("TheatreArea");
        var theathers, theatherslist = '';
        for (i = 0; i < items.length; i++) {
            theathers = items[i].getElementsByTagName('Name').item(0).firstChild.nodeValue;
            var item = '<option>' + theathers + '</option>';
            theatherslist += item;
                
    }
}

    console.log(theatherslist)
    document.getElementById("pullDown").innerHTML = theatherslist;
}
}

function loadEvents(filename) {
    var x = document.getElementById("events");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var xmlhttpEvents = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpEvents.open("GET", filename, true);
    xmlhttpEvents.send();
    xmlhttpEvents.onreadystatechange = function () {
        // If we are still loading...
        if (xmlhttpEvents.readyState === 1) {
            document.getElementById("events").innerHTML = "Loading...";
        }
        // If everything is ok
        if (xmlhttpEvents.readyState === 4 && xmlhttpEvents.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            //
            var xmlDocEvents = xmlhttpEvents.responseXML;
            console.log(xmlDocEvents);
            // Once again we find some tags from our variable containing XML
            var items = xmlDocEvents.getElementsByTagName("Event");
            // And since they are arrays, we use for loop to travel through them
            //
            //
            var item, feedlink, name, description, content, pic, pic2 = '';
            for (i = 0; i < items.length; i++) {

                //load movie info
                feedlink = items[i].getElementsByTagName('EventURL')[0].firstChild.nodeValue;
                name = items[i].getElementsByTagName('Title')[0].firstChild.nodeValue;
                rate = items[i].getElementsByTagName('RatingImageUrl')[0].firstChild.nodeValue;

                //pic = items[i].getElementsByTagName('Images')[0].childNodes[1].firstChild.nodeValue;
                //pic2 = pic.getElementByTagName('EventSmallImagePortrait');
                console.log(pic);
                //EI TOIMI ENÄÄ!!!
                //description = items[i].getElementsByTagName('ShortSynopsis')[0].firstChild.nodeValue;
            
                // add info to div
                item = '<div id="contentBox" class="gradie"><img src="' + pic + '"><img src="' + rate + '"><h3> ' + name + ' </h3><p> ' + description + ' </p><a href="' + feedlink + '">' + name + '</a></div>';
                content += item;       
            }
            // Finally we place the contents in a div
            document.getElementById("events").innerHTML = "<ul>" + content + "</ul>";
        }
    }
}

function loadSchedule(filename) {
    var x = document.getElementById("schedules");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var xmlhttpSchedule = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpSchedule.open("GET", filename, true);
    xmlhttpSchedule.send();
    xmlhttpSchedule.onreadystatechange = function () {
        // If we are still loading...
        if (xmlhttpSchedule.readyState === 1) {
            document.getElementById("schedules").innerHTML = "Loading...";
        }
        // If everything is ok
        if (xmlhttpSchedule.readyState === 4 && xmlhttpSchedule.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            //
            var xmlDocSchedule = xmlhttpSchedule.responseXML;
            console.log(xmlDocSchedule);
            // Once again we find some tags from our variable containing XML
            var items = xmlDocSchedule.getElementsByTagName("Images");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            //
            var item, content, pic = '';
            for (i = 1; i < items.length; i++) {

                pic = items[i].getElementsByTagName('EventSmallImagePortrait')[0].firstChild.nodeValue;

                item = '<img src="' + pic + '">';
                content += item;
            }
            // Finally we place the contents in a div
            document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
        }
    }
}
