const metaScraper = require('meta-scraper').default;

metaScraper('https://www.dwcchiropractic.com/')
    .then(function (data) {
        console.log(data);
    });

//var urlToQuery = encodeURIComponent("https://www.dwcchiropractic.com/");

//$.ajax({
//    dataType: "jsonp",
//    url: "http://localhost:5000/query?url=" + urlToQuery,
//    success: function (data) {
//        console.log(data);
//        if (data["error"]) {
//            alert("Error: " + data["error"]);
//            return;
//        }
//        //PROCESS the result
//    },
//    timeout: 20000
//}).fail(function () {
//    console.log("fail");
//    //alert("Could not query site, the service might be down, please try again later.");
//    });

//console.log(urlToQuery);
//$.get(decodeURIComponent(urlToQuery), function (data) {
//    console.log(typeof(data));
//});












//var messages = {
//    yesDesign: "Ok, Let's get Started",
//    noDesign: "No Worries, I'll be here if you need me.",
//    website: "What's your website?",
//    weFoundPrimary: "These are the colours that I found, please choose one"
//};

//function createChatBubble(customId, message) {
//    $(".chatbox-chat").append('<div class="chat-bubble bubble-hide"id="' + customId + '"><p>' + message + '</p></div>');
//    setTimeout(function () {
//        $(".chat-bubble").addClass("bubble-show")
//    }, 200)
//};

//function createInputBubbles(customId, placeholder) {
//    $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="text" placeholder="' + placeholder + '"></div>');
//}

//$("#next-design").children('span').on("click", function () {
//    if ($(this).data("attribute") == true) {
//        createChatBubble("", messages.yesDesign);

//        $("#next-design").children('span').css("pointer-events", "none");

//        setTimeout(function () {
//            createChatBubble("", messages.website)
//        }, 1000)

//        setTimeout(function () {
//            createInputBubbles("website-url", "Website")
//        }, 2000)

//    } else {
//        createChatBubble("", messages.noDesign)
//    }
//});





var Norman = function () {
    var website;
    var primaryColors;
    var chosenPrimaryColor;
    var secondaryColors;
    var chosenSecondaryColor;

    var messages = {
        yesDesign: "Ok, Let's get Started",
        noDesign: "No Worries, I'll be here if you need me.",
        website: "What's your website?",
        weFoundPrimary: "These are the colours that I found, please choose one for your background",
        weFoundSecondary: "Great! Now, what color should the text be?"
    };



    function thinkingBubble(toggle) {
        console.log(toggle);
        console.log("in");
        if (toggle === true) {
            $(".chatbox-chat").append('<div class="chat-bubble bubble-hide thinking"><div class="loader"><span class="col-1"></span><span class="col-2"></span><span class="col-3"></span></div></div>');
            setTimeout(function () {
                $(".thinking").addClass("bubble-show");
            }, 200);
        } else if (toggle === false) {
            $(".thinking").remove();
        }
    }



    //reder out the view changes
    function triggerPrimaryColurs() {
        createChatBubble("", messages.weFoundPrimary);
        console.log(primaryColors);

        $(".chatbox-chat").append('<div id="primary-colors" class="chat-options bubble-hide"></div>');

        primaryColors.slice(0, 3).forEach(function (colour) {
            $("#primary-colors").append('<span class="chat-bubble-option colors primary" data-attribute="true" data-color="'+colour[0]+'" style="background-color:'
                + colour[0] + '"></span>');
        });
        setTimeout(function () {
            $(".chat-options").addClass("bubble-show");
        }, 200);
    }

    function triggerSecondaryColours() {
        createChatBubble("", messages.weFoundSecondary);
        $(".chatbox-chat").append('<div id="secondary-colors" class="chat-options bubble-hide"></div>');

        secondaryColors.slice(0, 3).forEach(function (colour) {
            $("#secondary-colors").append('<span class="chat-bubble-option colors secondary" data-attribute="true" data-color="' + colour[0] + '" style="background-color:'
                + colour[0] + '"></span>');
        });
        setTimeout(function () {
            $(".chat-options").addClass("bubble-show");
        }, 200);
    }

    function triggerWebsite() {
        website = website.replace(/^https?\:\/\//i, "");
        website = website.replace(/\/$/, "");
        console.log(website);
        console.log(chosenPrimaryColor);
        console.log(chosenSecondaryColor);

    }



    function handleResponse(data) {
        console.log(data);
        primaryColors = data.coloursBg;
        secondaryColors = data.coloursText;
        triggerPrimaryColurs();
    }


    function scrapeSite(website) {
        thinkingBubble(true);
        console.log('in scrapesite');
        $.ajax({
            dataType: "jsonp",
            url: "http://localhost:5000/query?url=" + website,
            success: function (data) {
                console.log(data);
                if (data["error"]) {
                    alert("Error: " + data["error"]);
                    thinkingBubble(false);
                    return;
                }
                //PROCESS the result
                thinkingBubble(false);

                handleResponse(data);
            },
            timeout: 10000
        }).fail(function () {
            thinkingBubble(false);
            // alert("Could not query site, the service might be down, please try again later.");
        });
    }

    function createChatBubble(customId, message) {
        $(".chatbox-chat").append('<div class="chat-bubble bubble-hide"id="' + customId + '"><p>' + message + '</p></div>');
        setTimeout(function () {
            $(".chat-bubble").addClass("bubble-show");
        }, 200);
    };

    function createInputBubbles(customId, placeholder) {
        $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="text" placeholder="' + placeholder + '"><button>Send</button></div>');
    }

    function eventHookups() {
        $("#next-design").children('span').on("click", function () {
            if ($(this).data("attribute") == true) {
                createChatBubble("", messages.yesDesign);

                $("#next-design").children('span').css("pointer-events", "none");

                setTimeout(function () {
                    createChatBubble("", messages.website);
                }, 1000);

                setTimeout(function () {
                    createInputBubbles("website-url", "Website")
                }, 2000);
            } else {
                createChatBubble("", messages.noDesign);
            }
        });

        $('body').on('click', 'span.chat-bubble-option.colors.primary', function (el) {
            chosenPrimaryColor = $(this).attr("data-color");
            triggerSecondaryColours();
        });

        $('body').on('click', 'span.chat-bubble-option.colors.secondary', function (el) {
            console.log(this);
            chosenSecondaryColor = $(this).attr("data-color");
            triggerWebsite();
        });

        //INPUT WEBSITE
        $(document).on("click", "#website-url>button", function () {
            console.log("clicked");
            website = $("#website-url input").val();
            scrapeSite(website);
        });
    }

    function init() {
        // $(document).ready(function(){
        eventHookups();
        // })
    }

    return {
        init: init
    };
}();

Norman.init();