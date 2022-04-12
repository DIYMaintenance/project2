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
