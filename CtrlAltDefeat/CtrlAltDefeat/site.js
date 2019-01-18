const metaScraper = require('meta-scraper').default;

metaScraper('https://www.dwcchiropractic.com/')
    .then(function (data) {
        console.log(data);
    });

var urlToQuery = encodeURIComponent("https://www.dwcchiropractic.com/");

$.ajax({
    dataType: "jsonp",
    url: "http://localhost:5000/query?url=" + urlToQuery,
    success: function (data) {
        console.log(data);
        if (data["error"]) {
            alert("Error: " + data["error"]);
            return;
        }
        //PROCESS the result
    },
    timeout: 20000
}).fail(function () {
    console.log("fail");
    //alert("Could not query site, the service might be down, please try again later.");
});