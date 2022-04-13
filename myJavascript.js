//Calling function that will load theathers to theather selection pulldownmenu.
loadMenu()
//Tässä ladataan synopsis lista, mikä sisältää arraylistin, missä on kaksi objektia per rivi: title ja synopsis. Oli tarkoituksena tehdä getDataan() for lause, 
//mikä käy sitten läpi tämän listan ja vertailee että jos title täsmää, niin tulostetaan synopsis divin sisään. Mutta tälle on niin vitun vaikeeta saada tuo "data_array lista tuon 
//funktion ulkopuolelle niin antaa olla :D" Synopsis listan saat ladattua konsolista kirjoittamalla loadSynopsis() ja se tulee hienosti esiin mutta helvetti miten vaikeaa.
function loadSynopsis() {
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
            //console.log(data_array);
            getData(data_array);
        }
    }
}
function loadOnSearchSynopsis() {
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
            //console.log(data_array);
            findMovies(data_array);
        }
    }
}
    //Event listeners
    document.getElementById("pullDown").addEventListener("click", catFunction());
    document.getElementById("Button").addEventListener("click", loadSynopsis);
    document.getElementById("movie1").addEventListener("click", loadOnSearchSynopsis);

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
                // Once again we find some tags from our variable containing XML
                var items = xmlDocSchedule.getElementsByTagName("Show");
                // And since they are arrays, we use for loop to travel through them
                // I wanted to display results in a table so im creating table tags and table cells
                //
                //
                var item, content, pic, name, rate, feedlink, movie, genre, time = '';
                var synopsis = a;
                console.log(synopsis);
                var synop = '';
                
                for (j = 1; j < items.length; j++) {

                    name = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue;
                    //if the film is in a performance at that theater, its details will be printed id div "contentbox"
                    if (name == output) {
                        movie = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                        pic = items[j].getElementsByTagName('EventSmallImageLandscape').item(0).firstChild.nodeValue;
                        rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                        feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                        genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                        time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                        theathrename = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue

                        // Hakee nimen perusteella oikean kuvauksen
                        for (var i = 0; i < synopsis.length; i++){
                           
                           if (synopsis[i].title == movie){
                            tit = synopsis[i].title;
                            synop = synopsis[i].synopsis;
                           
                            console.log(tit + synop);
                        }
                    }
                        item = document.getElementById("schedules").innerHTML = '<div id="contentBox" class="gradie"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><a href="' + feedlink + '"><h3>' + movie + '</h3></a><br><p><strong>Teatteri: </strong><br><a href="' + feedlink + '">' + theathrename + '</a></p><p>' + synop + '</p><p class="time"><strong> Näytösaika: </strong><br>' + time + '</p><p class="genre">' + genre + '</p></div>';
                        content += item;
                    
                    } else {
                        //If film is not in theater, it will be skipped and details not shown.
                        console.log("skipped");
                    }
                    
                    //console.log(getSynop);
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

    //Function for manual textfield search.
    function findMovies(a) {
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
                var theathrename, item, content, pic, name, rate, feedlink, movies, genre, time = '';
                var synopsis = a;
                console.log(synopsis);
                var synop = '';
                for (j = 1; j < items.length; j++) {

                    name = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                    genreSearch = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                    //If title match searchfield text fully or partiatly, it will print movie details below in "contentbox" -div
                    if (name.match(x) || genreSearch.match(x)) {
                        movies = items[j].getElementsByTagName('Title').item(0).firstChild.nodeValue;
                        pic = items[j].getElementsByTagName('EventSmallImageLandscape').item(0).firstChild.nodeValue;
                        rate = items[j].getElementsByTagName('RatingImageUrl').item(0).firstChild.nodeValue;
                        feedlink = items[j].getElementsByTagName('ShowURL').item(0).firstChild.nodeValue;
                        genre = items[j].getElementsByTagName('Genres').item(0).firstChild.nodeValue;
                        time = items[j].getElementsByTagName('dttmShowStart').item(0).firstChild.nodeValue;
                        theathrename = items[j].getElementsByTagName('Theatre').item(0).firstChild.nodeValue

                        // Hakee nimen perusteella oikean kuvauksen
                        for (var i = 0; i < synopsis.length; i++){
                           
                            if (synopsis[i].title == movies){
                             tit = synopsis[i].title;
                             synop = synopsis[i].synopsis;
                            
                             console.log(tit + synop);
                         }
                     }

                     item = document.getElementById("schedules").innerHTML = '<div id="contentBox" class="gradie"><img class="image" src="' + pic + '"><img class="rate" src="' + rate + '"><a href="' + feedlink + '"><h3>' + movies + '</h3></a><br><p><strong>Teatteri: </strong><br><a href="' + feedlink + '">' + theathrename + '</a></p><p>' + synop + '</p><p class="time"><strong> Näytösaika: </strong><br>' + time + '</p><p class="genre">' + genre + '</p></div>';
                     content += item;
                    } else {
                        //if not, then nothing is showed and textbox border goes red.
                        document.getElementById("moviesearch").style.borderColor = "red";
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
