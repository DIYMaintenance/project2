//Calling function that will load theathers to theather selection pulldownmenu.
loadMenu()
//Event listeners
document.getElementById("pullDown").addEventListener("click", catFunction());
// Get data eventlistener
document.getElementById("Button").addEventListener("click", (evt) => loadSynopsis(b = "pulldown"));
// Search eventlistener
document.getElementById("movie1").addEventListener("click", (evt) => loadSynopsis(b = "ManualSearch"));

function loadSynopsis(b) {
    document.getElementById("moviesearch").style.borderColor = "inherit"; //Changes textfield bordercolor back to normal.
    document.getElementById("pullDown").style.borderColor = "inherit"; //Changes pulldownmenu bordercolor back to normal.
    var xmlhttp = new XMLHttpRequest();
    //Getting XML file from Finnkino Events 
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Events/", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 1) {
            console.log("Loading XML...");
        }
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log("XML downloaded, filtering arraylist with title and synopsis...")
            var xmlDoc = xmlhttp.responseXML;
            var items = xmlDoc.getElementsByTagName("Event");
            var data_array = [];
            for (i = 0; i < items.length; i++) {
                var my_object = {};
                my_object["title"] = items[i].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                my_object["synopsis"] = items[i].getElementsByTagName('ShortSynopsis').item(0).firstChild.nodeValue;
                data_array.push(my_object);
            }
            console.log("Arr done.");
            if (b == "ManualSearch") {
                findMovies(data_array);
                console.log("manual")
                //console.log(data_array);
            }
            if (b == "pulldown") {
                getData(data_array)
                console.log("pulldown");

            } else {
                console.log("Error");
            }
        }
    }
}



document.getElementById("movie1").addEventListener("click", findMovies);

// Load XML to memory
function loadMenu() {
    var xmlhttpCinemas = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpCinemas.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttpCinemas.send();
    xmlhttpCinemas.onreadystatechange = function () {
        // If everything is ok
        if (xmlhttpCinemas.readyState === 4 && xmlhttpCinemas.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //
            var xmlDocCinemas = xmlhttpCinemas.responseXML;
            var items = xmlDocCinemas.getElementsByTagName("Show");
            var theathers = '';
            const theatherslist = [""];
            for (i = 0; i < items.length; i++) {
                theathers = items[i].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                var item = theathers;
                theatherslist.push(item);

            }
            //Calling function toUniqueArray and sends theatherlist to that function, and it will removes dublicate values from theatherlist.
            var theatherslistNoDublicats = toUniqueArray(theatherslist);
            var select = document.getElementById("pullDown");
            //Adding theathers to dropdownmenu.
            for (var i = 1; i < theatherslistNoDublicats.length; i++) {
                var opt = theatherslistNoDublicats[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
        }
    }
}

//Function that will remove dublicat theathers from theatherlist.
function toUniqueArray(a) {
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        if (newArr.indexOf(a[i]) === -1) {
            newArr.push(a[i]);
        }
    }
    return newArr;
}

//GetData function gets data from that theather which is selected from pulldownmenu
function getData(a) {
    selectElement = document.querySelector('#pullDown');
    output = selectElement.options[selectElement.selectedIndex].value;
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
            // Once again we find some tags from our variable containing XML
            var items = xmlDocSchedule.getElementsByTagName("Show");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            //
            var item, content, pic, name, rate, feedlink, movie, genre, time, synopsis = "";
            var synopsisMovie = a;
            for (j = 0; j < items.length; j++) {

                name = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                //if the film is in a performance at that theater, its details will be printed id div "contentbox"
                if (name == output) {
                    movie = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                    pic = items[j].getElementsByTagName('EventSmallImageLandscape').item(0).firstChild.nodeValue;
                    rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                    feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                    genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                    time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                    time = time.replace("T", " ");
                    theathrename = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue
                    //Find synopsis for movie.
                    for (i = 0; i < synopsisMovie.length; i++) {
                        if (synopsisMovie[i].title == movie) {
                            synopsis = synopsisMovie[i].synopsis;

                        } else {
                            //pass
                        }

                    }

                    item = '<div id="contentBox" class="gradie center"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><a href="' + feedlink + '"><h3>' + movie + '</h3></a><br><p><strong>Teatteri: </strong><br><a href="' + feedlink + '">' + theathrename + '</a></p><p>' + synopsis + '</p><p class="time"><strong> Näytösaika: </strong><br>' + time + '</p><p class="genre">' + genre + '</p></div>';
                    content += item;

                }

            }
            if (typeof content !== 'undefined') {
                //This removes unwanted "undefined" texts from the page.
                document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
            }
            if (output == "valitse") {
                //If there is no selected theather, error message is printed and pulldown borders changes red.
                txt = "<ul>" + "Valitse ensin teattari valikosta!" + "</ul>";
                document.getElementById("schedules").innerHTML = txt.fontcolor("white");
                document.getElementById("pullDown").style.borderColor = "red";
            }
            else {
                //pass
            }
        }
    }
}

//Function for manual textfield search.
function findMovies(data) {
    var x = document.getElementById("moviesearch").value;
    var xmlhttpSchedule = new XMLHttpRequest();
    // We replace the statif file with URL
    //
    xmlhttpSchedule.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttpSchedule.send();
    xmlhttpSchedule.onreadystatechange = function () {
        // If everything is ok
        if (xmlhttpSchedule.readyState === 4 && xmlhttpSchedule.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //
            var xmlDocSchedule = xmlhttpSchedule.responseXML;
            // Once again we find some tags from our variable containing XML
            var items = xmlDocSchedule.getElementsByTagName("Show");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            //
            var theathrename, item, content, pic, name, rate, feedlink, movie, genre, time, genreSearch = '';
            var synopsisMovie = data;

            // alustetaan muuttuja tekstillä latauksen ajaksi
            var synopsis = "Odotappa hetkinen...";
            //console.log(synopsisData);
            for (j = 0; j < items.length; j++) {
                // Haetaan nimi jolla verrataan haussa
                name = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                //The user-entered keyword in searchfield, movie title, and genre are now converted to lowercase so that the search result finds something.
                let namelower = name.toLowerCase();//Variable name is converted to lowercase
                let xlower = x.toLowerCase();//Variable x, which is value from textfield, is converted to lowercase
                // Haetaan kategoria, jolla verrataan haussa
                genreSearch = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                genreSearchlower = genreSearch.toLowerCase(); //Variable genreSearch is converted to lowercase
                //If title match searchfield text fully or partiatly, it will print movie details below in "contentbox" -div
                if ((namelower.match(xlower) || genreSearchlower.match(xlower)) && xlower.length != "") {
                    movie = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                    pic = items[j].getElementsByTagName('EventSmallImageLandscape').item(0).firstChild.nodeValue;
                    rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                    feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                    genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                    time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                    time = time.replace("T", " ");
                    theathrename = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue
                    //Find synopsis for movie.
                    for (i = 0; i < synopsisMovie.length; i++) {
                        if (synopsisMovie[i].title == movie) {
                            synopsis = synopsisMovie[i].synopsis;
                        } else {
                            //pass
                        }

                    }
                    item = document.getElementById("schedules").innerHTML = '<div id="contentBox" class="gradie center"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><a href="' + feedlink + '"><h3>' + movie + '</h3></a><br><p><strong>Teatteri: </strong><br><a href="' + feedlink + '">' + theathrename + '</a></p><p>' + synopsis + '</p><p class="time"><strong> Näytösaika: </strong><br>' + time + '</p><p class="genre">' + genre + '</p></div>';
                    content += item;
                }
                if (xlower == "") {
                    //If textfield is empty, alert user and changes textfield borders red.
                    txt = "<ul>" + "Kirjoita ensin jotain tekstikenttään. " + "</ul>";
                    document.getElementById("schedules").innerHTML = txt.fontcolor("white");
                    document.getElementById("moviesearch").style.borderColor = "red";
                    break;
                }
                if (xlower != "" && j == 0) {
                    //If textfield contains keyword, but there is no results. Printing message "no results" and chages textfield border back to normal if it was red.
                    txt = "<ul>" + "Pahoittelut, ei hakutuloksia hakusanlla " + x + "." + "</ul>";
                    document.getElementById("schedules").innerHTML = txt.fontcolor("white");
                    document.getElementById("moviesearch").style.borderColor = "inherit"; //Changes textfield bordercolor back to normal.
                }
            }
            //This removes unwanted "undefined" texts from the page.
            if (typeof content !== 'undefined') {
                document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
            } else {
                console.log("Tyhjää");
            }
        }
    }
}

//Function that will print "kissa" to the console.
function catFunction() {
    console.log("kissa");
}
