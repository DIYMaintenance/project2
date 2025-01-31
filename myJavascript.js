//Calling function that will load theathers to theather selection pulldownmenu.
loadMenu()
//Event listeners
document.getElementById("pullDown").addEventListener("click", pulldownFunction());
// Get data eventlistener
document.getElementById("Button").addEventListener("click", (evt) => loadSynopsis(b = "pulldown"));
// Search eventlistener
document.getElementById("movie1").addEventListener("click", (evt) => loadSynopsis(b = "ManualSearch"));

// Function to get synopsis from another XML file
function loadSynopsis(b) {
    document.getElementById("moviesearch").style.borderColor = "inherit"; //Changes textfield bordercolor back to normal.
    document.getElementById("pullDown").style.borderColor = "inherit"; //Changes pulldownmenu bordercolor back to normal.
    var xmlhttp = new XMLHttpRequest();
    //Getting XML file from Finnkino Events 
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Events/", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 1) {
            console.log("Loading Info");
        }
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log("XML downloaded, filtering arraylist with title and synopsis...")
            var xmlDoc = xmlhttp.responseXML;
            var items = xmlDoc.getElementsByTagName("Event");
            // Parsing info from XML
            var data_array = [];
            // For loop that makes arraylist with two objects: title and synopsis 
            for (i = 0; i < items.length; i++) {
                var my_object = {};
                my_object["title"] = items[i].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                my_object["synopsis"] = items[i].getElementsByTagName('ShortSynopsis').item(0).firstChild.nodeValue;
                data_array.push(my_object);
            }
            // If functions parameter is manualsearch run findMovies function with parameter data_array
            if (b == "ManualSearch") {
                findMovies(data_array);

            }
            // If functions parameter is pulldown run getData function with parameter data_array
            if (b == "pulldown") {
                getData(data_array)
                // if something goes wrong print console "error"
            } else {
                //pass
            }
        }
    }
}

// Load theaters to pulldown menu
function loadMenu() {
    var xmlhttpCinemas = new XMLHttpRequest();

    //Getting XML file from Finnkino "Schedule"
    xmlhttpCinemas.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttpCinemas.send();
    xmlhttpCinemas.onreadystatechange = function () {
        // If everything is ok
        if (xmlhttpCinemas.readyState === 4 && xmlhttpCinemas.status === 200) {

            //Parse xml data
            var xmlDocCinemas = xmlhttpCinemas.responseXML;
            var items = xmlDocCinemas.getElementsByTagName("Show");
            var theathers = '';
            const theatherslist = [""];
            // for loop that will make arraylist which includes all theater names
            for (i = 0; i < items.length; i++) {
                theathers = items[i].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                var item = theathers;
                theatherslist.push(item);

            }
            //Calling function toUniqueArray and sends theatherlist to that function, and it will removes dublicate values from theatherlist.
            var theatherslistNoDublicats = toUniqueArray(theatherslist);
            var select = document.getElementById("pullDown");
            //For loop that adding theathers to dropdown menu.
            for (var i = 1; i < theatherslistNoDublicats.length; i++) {
                var opt = theatherslistNoDublicats[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                // Adding one more element to dropdown menu
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
    return newArr; // Return theater list without dublicates
}

//GetData function gets data from that theather which is selected from pulldownmenu
function getData(a) {
    selectElement = document.querySelector('#pullDown'); //checking which theater has been selected
    output = selectElement.options[selectElement.selectedIndex].value;
    var xmlhttpSchedule = new XMLHttpRequest();
    //Getting XML file from Finnkino "Schedule"
    xmlhttpSchedule.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttpSchedule.send();
    xmlhttpSchedule.onreadystatechange = function () {
        // if loading
        if (xmlhttpSchedule.readyState === 1) {
            document.getElementById("schedules").innerHTML = "Loading...";
        }
        // If everything is ok
        if (xmlhttpSchedule.readyState === 4 && xmlhttpSchedule.status === 200) {

            var xmlDocSchedule = xmlhttpSchedule.responseXML;
            // Get show to items variable
            var items = xmlDocSchedule.getElementsByTagName("Show");

            // Get current time
            var date = new Date();
            // Get only hours
            var aikaT = date.getHours();
            // Get only minutes
            var aikaM = date.getMinutes();
            // add leading 0 if under or equal to 9
            aikaM = aikaM <= 9 ? '0' + aikaM : aikaM;
            // Format variables for data
            var item, content, pic, name, rate, feedlink, movie, genre, time, synopsis = "";
            var synopsisMovie = a;
            // get data from xml 
            for (j = 0; j < items.length; j++) {

                name = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                //if the film is in a performance at that theater, its details will be printed id div "contentbox"
                if (name == output) {
                    movie = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                    pic = items[j].getElementsByTagName('EventSmallImagePortrait').item(0).firstChild.nodeValue;
                    rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                    feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                    genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                    time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                    // removing "T" from time that xml gives us
                    time = time.replace("T", " " + '<br>');
                    // slice time from xml to parsing only show when its starting
                    tunnit = time.slice(15, -6);
                    minuutit = time.slice(18, -3);
                    theathrename = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                    //Find synopsis for movie.
                    for (i = 0; i < synopsisMovie.length; i++) {
                        if (synopsisMovie[i].title == movie) {
                            synopsis = synopsisMovie[i].synopsis;

                        } else {
                            //pass
                        }
                    } // compare time and print shows if is upcomming today
                    if (tunnit >= aikaT && minuutit >= aikaM || tunnit > aikaT) {
                        // making new div with all movie information
                        item = '<div id="contentBox" class="gradie center"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><div><a href="' + feedlink + '"><h3>' + movie + '</h3></a><br><p><strong>Teatteri: </strong><br><a href="' + feedlink + '">' + theathrename + '</a></p></div><p>' + synopsis + '</p><div class="timeDiv"><p class="time"><strong> Näytösaika: </strong><br>' + time + '</p><p class="genre">' + genre + '</p></div></div>';
                        content += item;
                    } else {
                        // error if no shows today
                        document.getElementById('schedules').innerHTML = '<ul><p class="txtWarning">Ei näytöksiä tänään!</p></ul>';
                    }
                }
            }
        }
        if (typeof content !== 'undefined') {
            //This removes unwanted "undefined" texts from the page.
            document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
        }
        if (output == "valitse") {
            //If there is no selected theather, error message is printed and pulldown borders changes red.
            content = '<ul><p class="txtWarning">Valitse ensin teatteri valikosta!</p></ul>';
            document.getElementById("schedules").innerHTML = content;
            document.getElementById("pullDown").style.borderColor = "red";
        } else {
            //pass
        }
    }
}
//Function for manual textfield search.
function findMovies(data) {
    var x = document.getElementById("moviesearch").value;
    var xmlhttpSchedule = new XMLHttpRequest();
    // Get data from Schedule xml
    xmlhttpSchedule.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttpSchedule.send();
    xmlhttpSchedule.onreadystatechange = function () {
        // If everything is ok
        if (xmlhttpSchedule.readyState === 4 && xmlhttpSchedule.status === 200) {
            // parsing data
            var xmlDocSchedule = xmlhttpSchedule.responseXML;
            // find tags from xml
            var items = xmlDocSchedule.getElementsByTagName("Show");
            //variables to get data
            var theathrename, item, pic, content, name, rate, feedlink, movie, genre, time, genreSearch = '';
            var synopsisMovie = data;
            // Get current time
            var date = new Date();
            // Get only hours
            var aikaT = date.getHours();
            // Get only minutes
            var aikaM = date.getMinutes();
            // add leading 0 if under or equal to 9
            aikaM = aikaM <= 9 ? '0' + aikaM : aikaM;

            // Format variable to text while loading
            var synopsis = "Odotappa hetkinen...";

            for (j = 0; j < items.length; j++) {
                // Get name to compare in search
                name = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                //The user-entered keyword in searchfield, movie title, and genre are now converted to lowercase so that the search result finds something.
                let namelower = name.toLowerCase(); //Variable name is converted to lowercase
                let xlower = x.toLowerCase(); //Variable x, which is value from textfield, is converted to lowercase
                // Getting category to compare in search
                genreSearch = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                genreSearchlower = genreSearch.toLowerCase(); //Variable genreSearch is converted to lowercase
                //If title match searchfield text fully or partiatly, it will print movie details below in "contentbox" -div
                if ((namelower.match(xlower) || genreSearchlower.match(xlower)) && xlower.length != "") {
                    movie = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                    pic = items[j].getElementsByTagName('EventSmallImagePortrait').item(0).firstChild.nodeValue;
                    rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                    feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                    genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                    time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                    time = time.replace("T", " " + '<br>');
                    // slice to show only hour
                    tunnit = time.slice(15, -6);
                    // slice to show only minutes
                    minuutit = time.slice(18, -3);
                    theathrename = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue
                    //Find synopsis for movie.
                    for (i = 0; i < synopsisMovie.length; i++) {
                        if (synopsisMovie[i].title == movie) {
                            synopsis = synopsisMovie[i].synopsis;
                        } else {
                            //pass
                        }

                    } // compare time and print shows if is upcomming today
                    if (tunnit >= aikaT && minuutit >= aikaM || tunnit > aikaT) {
                        item = document.getElementById("schedules").innerHTML = '<div id="contentBox" class="gradie center"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><div><a href="' + feedlink + '"><h3>' + movie + '</h3></a><br><p><strong>Teatteri: </strong><br><a href="' + feedlink + '">' + theathrename + '</a></p></div><p>' + synopsis + '</p><div class="timeDiv"><p class="time"><strong> Näytösaika: </strong><br>' + time + '</p><p class="genre">' + genre + '</p></div></div>';
                        content += item;
                    } else {
                        // error if no shows today
                        document.getElementById('schedules').innerHTML = '<ul><p class="txtWarning">Ei näytöksiä tänään!</p></ul>';
                    }
                }
                //This removes unwanted "undefined" texts from the page.
                if (typeof content !== 'undefined') {
                    document.getElementById("schedules").innerHTML = "<ul>" + content + "</ul>";
                } else {
                    //pass
                }
                if (xlower == "") {
                    //If textfield is empty, alert user and changes textfield borders red.
                    txt = "<ul>" + '<p class="txtWarning">Kirjoita ensin jotain tekstikenttään.</p>' + "</ul>";
                    document.getElementById("schedules").innerHTML = txt;
                    document.getElementById("moviesearch").style.borderColor = "red";
                    break;
                }
                else if (xlower != "" && j == 0) {
                    //If textfield contains keyword, but there is no results. Printing message "no results" and chages textfield border back to normal if it was red.
                    txt = "<ul>" + '<p class="txtWarning">Pahoittelut, ei hakutuloksia hakusanalla ' + x + "." + "</p></ul>";
                    document.getElementById("schedules").innerHTML = txt;
                    document.getElementById("moviesearch").style.borderColor = "inherit"; //Changes textfield bordercolor back to normal.
                }else{
                    //pass
                }
            }

        }
    }
}

//Function that will print "Pulldown OK!" to the console.
function pulldownFunction() {
    console.log("Pulldown OK!");
}