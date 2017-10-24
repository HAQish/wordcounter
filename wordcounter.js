// ==UserScript==
// @name         word counter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  simple word counter for webpages and links
// @author       You
// @match        *
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// still need a work-around for denied cross-domain requests

// document.querySelectorAll('a').forEach(anchor => anchor.onmouseover = () => console.log("Hi!"))

function parentFunction() {
    document.querySelectorAll('a').forEach(anchor => anchor.onmouseover = function(event) {
        var link = event.currentTarget;
        var url = link.href;
        console.log("Mousing over " + url);
        $.get({
            "url": url,
            "success": function (data, status) {
                console.log("Got it!");
                var formattedPage = data.replace(/<[^>]+>/g, "");
                /*$(header).remove();
                $(footer).remove();*/                  // would like to remove header and footer just to get the word counter more accurate to the inner text, but
                // not sure how to select an element not on the current page in jquery
                // formattedPage.replace(/<header.+\/header>/g, "");
                // formattedPage.replace(/<footer.+\/footer>/g, "");
                var wordCount = formattedPage.match(/\S\s\S/g).length;
                var message = `${link} has word count: ${wordCount}`;
                console.log(message);
                link.title = message;
            },
            "error": function (err) {
                console.log(err);
                console.log("ERROR " + link);
            }
        });
    });
}

