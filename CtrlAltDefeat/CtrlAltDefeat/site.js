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
















var messages = {
    yesDesign: "Ok, Let's get Started",
    noDesign: "No Worries, I'll be here if you need me.",
    website: "What's your website?",
};

function createChatBubble(customId, message) {
    $(".chatbox-chat").append('<div class="chat-bubble bubble-hide"id="' + customId + '"><p>' + message + '</p></div>');
    setTimeout(function () {
        $(".chat-bubble").addClass("bubble-show")
    }, 200)
};

function createInputBubbles(customId, placeholder) {
    $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="text" placeholder="' + placeholder + '"></div>');
}

$("#next-design").children('span').on("click", function () {
    if ($(this).data("attribute") == true) {
        createChatBubble("", messages.yesDesign);

        $("#next-design").children('span').css("pointer-events", "none");

        setTimeout(function () {
            createChatBubble("", messages.website)
        }, 1000)

        setTimeout(function () {
            createInputBubbles("website-url", "Website")
        }, 2000)

    } else {
        createChatBubble("", messages.noDesign)
    }
});