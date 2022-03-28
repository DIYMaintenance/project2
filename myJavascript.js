function loadCinemas(filename) {
    var x = document.getElementById("theaters");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var xmlhttpCinemas = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpCinemas.open("GET", filename, true);
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
            // Once again we find some tags from our variable containing XML
            var items = xmlDocCinemas.getElementsByTagName("TheatreArea");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            //
            var item, feedlink, name, description, content = '';
            for (i = 1; i < items.length; i++) {
                feedlink = items[i].getElementsByTagName('ID').item(0).firstChild.nodeValue;
                name = items[i].getElementsByTagName('Name').item(0).firstChild.nodeValue;
                item = '<li>' + name + '</li>';
                item = '<li><a href="' + feedlink + '">' + name + '</a></li>';
                content += item;
            }
            // Finally we place the contents in a div
            document.getElementById("theaters").innerHTML = "<ul>" + content + "</ul>";
        }
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
            var items2 = xmlDocEvents.getElementsByTagName("Images");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            //
            var item, feedlink, name, description, content, pic = '';
            for (i = 0; i < items.length; i++) {

                //Lataa kuvan
               /*for (j = 0; j < items2.length; j++) {
                    pic = items2[j].getElementsByTagName('EventSmallImagePortrait').item(0).firstChild.nodeValue;
                   return pic;
                }*/
                
            
                //lataa linkin
                feedlink = items[i].getElementsByTagName('EventURL').item(0).firstChild.nodeValue;
                name = items[i].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                description = items[i].getElementsByTagName('ShortSynopsis').item(0).firstChild.nodeValue;

                // lisää nimen ja kuvauksen diviin
                item = '<div id="contentBox" class="gradie"><img src="' + pic + '"><h3> ' + name + ' </h3><p> ' + description + ' </p><a href="' + feedlink + '">' + name + '</a></div>';
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
            var item, feedlink, name, description, content, pic = '';
            for (i = 1; i < items.length; i++) {

                pic = items[i].getElementsByTagName('EventSmallImagePortrait').item(0).firstChild.nodeValue;
                item = '<img src="'+ pic + '">';
                content += item;
            }
            // Finally we place the contents in a div
            document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
        }
    }
}
