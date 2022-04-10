loadMenu()
document.getElementById("pullDown").addEventListener("click", catFunction());
document.getElementById("getButton").addEventListener("click", getData);
// Load XML to memory
function loadMenu() {
    var xmlhttpCinemas = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpCinemas.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
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
            var items = xmlDocCinemas.getElementsByTagName("Show");
            var theathers = '';
            const theatherslist = [""];
            const secondThearherlist = [""];
            for (i = 0; i < items.length; i++) {
                theathers = items[i].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                //var item = '<option>' + theathers + '</option>';
                var item = theathers;
                theatherslist.push(item);

            }
            var theatherslistNoDublicats = toUniqueArray(theatherslist);
            var select = document.getElementById("pullDown");
            for (var i = 1; i < theatherslistNoDublicats.length; i++) {
                var opt = theatherslistNoDublicats[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
            console.log(theatherslistNoDublicats);
        }

        //document.getElementById("pullDown").innerHTML = theatherslistNoDublicats;
    }
}

function toUniqueArray(a) {
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        if (newArr.indexOf(a[i]) === -1) {
            newArr.push(a[i]);
        }
    }
    return newArr;
}

function getData() {
    selectElement = document.querySelector('#pullDown');
    output = selectElement.options[selectElement.selectedIndex].value;
    console.log(output);
    var xmlhttpSchedule = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpSchedule.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
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
            var items = xmlDocSchedule.getElementsByTagName("Show");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            //
            var item, content, pic, idSchedule, thea, name, rate, feedlink, description, movies, genre, time = '';
            for (j = 1; j < items.length; j++) {

                name = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                if (name == output) {
                    movies = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                    pic = items[j].getElementsByTagName('EventSmallImageLandscape').item(0).firstChild.nodeValue;
                    rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                    feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                    genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                    time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                    item = document.getElementById("schedules").innerHTML = '<div id="contentBox" class="gradie"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><a href="' + feedlink + '"><h3>' + movies + '</h3></a>' + '<p> ' + description + ' </p><a href="' + feedlink + '">' + name + '</a>' + '<p>' + '<strong> Näytösaika: </strong><br>' + time + '</p>' + '<p class="genre">' + genre + '</p></div>';
                    content += item;
                } else {
                    console.log("skipped");
                }

            }
            document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";

            console.log(movies);
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
            var items = xmlDocSchedule.getElementsByTagName("Show");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            //
            var item, content, pic, name = '';
            for (i = 1; i < items.length; i++) {

                //pic = items[i].getElementsByTagName('EventSmallImagePortrait')[0].firstChild.nodeValue;
                name = items[i].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                item = "<ul>" + name + "</ul>";
                content += item;
                console.log(content);
            }
            // Finally we place the contents in a div
            document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
            console.log(content);
        }
    }
}

function catFunction() {
    console.log("kissa");
}