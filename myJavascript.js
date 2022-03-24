// Lets define the same function as before, but with a parameter in which we can set the url/filename to be fetceh
function loadAndParseNews(filename) {
    var xmlhttp = new XMLHttpRequest();
    // We replace the statif file with URL
    
    xmlhttp.open("GET", filename, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        // If we are still loading...
        if(xmlhttp.readyState === 1) {
            document.getElementById("newsfeed").innerHTML = "Wait while Im loading...";
        }
        // If everything is ok
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            
            var xmlDoc = xmlhttp.responseXML;
            console.log(xmlDoc);
            // Once again we find some tags from our variable containing XML
            var items = xmlDoc.getElementsByTagName("TheatreArea");
            // And since they are arrays, we use for loop to travel through them
            // I wanted to display results in a table so im creating table tags and table cells
            
            
            var item, feedlink, name, description, content = '';
            for(i = 0; i < items.length; i++) {
                feedlink = items[i].getElementsByTagName('ID').item(0).firstChild.nodeValue;
                name = items[i].getElementsByTagName('Name').item(0).firstChild.nodeValue;
                item = '<li>'+ name + '</li>';
                item = '<li><a href="'+feedlink+'">'+ name + '</a></li>';
                content += item;
            }
            // Finally we place the contents in a div
            document.getElementById("newsfeed").innerHTML = "<ul>"+content+"</ul>";
        }
    }
}
