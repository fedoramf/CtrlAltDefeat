const metaScraper = require('meta-scraper').default;

metaScraper('https://www.dwcchiropractic.com/')
    .then(function (data) {
        console.log(data);
    });

//var urlToQuery = encodeURIComponent("https://www.dwcchiropractic.com/");


//console.log(urlToQuery);
//$.get(decodeURIComponent(urlToQuery), function (data) {
//    console.log(typeof(data));
//});







var Norman = function () {
    var website;
    var primaryColors;
    var chosenPrimaryColor;
    var secondaryColors;
    var chosenSecondaryColor;
    var name;
    var position;
    var email;
    var phoneNumber;

    var messages = {
        yesDesign: "Ok, Let's get Started",
        noDesign: "No Worries, I'll be here if you need me.",
        website: "What's your website?",
        weFoundPrimary: "These are the colours that I found, please choose one for your background",
        weFoundSecondary: "Great! Now, what color should the text be?",
        needName: "Awesome! What's your full name?",
        needPosition: "Thanks, what is your position?",
        needEmail: "What email should people reach you at?",
        needPhone: "Which phone number should people reach you at?",
        triggerExit: "Great! I think I have a few great options for you, hold on!"
    };


    function sendData(data) {
        console.log(data);
        $(".main.home").css("display", "none");
        $(".main.custom").css("display", "block");
        $(".chatbot").css("display", "none");

     //   var postURL = "http://localhost:19470/Results/SendMetaData";
        //data = JSON.stringify(data);
        populateFields(data);

    }

    function hexToRgbA(hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.6)';
        }
    }

    function populateFields(data) {
        var $cards = $(".custom-cards .card-container");
        var opacity = Math.floor(Math.random() * Math.floor(1));
        var bg2 = hexToRgbA(data.bgColor);

        $cards.each(function (i, el) {
            $(el).find("p").css("color", data.textColor);
            $(el).find(".color-1").css("background", data.bgColor);
            $(el).find(".color-2").css("background", "rgba(" + data.bgColor + ", " + opacity + ")");
            $(el).find(".color-2").css("background", bg2);
            $(el).find("p.title").text(data.position);
            $(el).find("p.name").text(data.name);
            $(el).find("p.email").text(data.email);
            $(el).find("p.phoneNumber").text(data.phoneNumber);
            $(el).find("p.website").text(data.website);

        });

    }

    function thinkingBubble(toggle) {
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

    function triggerName() {
        createChatBubble("", messages.needName);
        var customId = "name";
        var placeholder = "name";
        $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="text" placeholder="' + placeholder + '"><button>Send</button></div>');
    }

    function triggerPosition(name) {
        createChatBubble("", messages.needPosition);
        var customId = "position";
        var placeholder = "position";
        $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="text" placeholder="' + placeholder + '"><button>Send</button></div>');
    }

    function triggerEmail() {
        createChatBubble("", messages.needEmail);
        var customId = "email";
        var placeholder = "email";
        $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="email" placeholder="' + placeholder + '"><button>Send</button></div>');
    }

    function triggerPhone() {
        createChatBubble("", messages.needPhone);
        var customId = "phone";
        var placeholder = "phone";
        $(".chatbox-chat").append('<div class="chat-inputs"id="' + customId + '"><input type="tel" placeholder="' + placeholder + '"><button>Send</button></div>');
    }

    function triggerExit() {
        createChatBubble("", messages.triggerExit);

        var data = {
            bgColor: chosenPrimaryColor,
            textColor: chosenSecondaryColor,
            website: website,
            phoneNumber: phoneNumber,
            email: email,
            position: position,
            name: name
        };

        sendData(data);
        // make post here
    }

    function handleResponse(data) {
        primaryColors = data.coloursBg;
        secondaryColors = data.coloursText;
        website = website.replace(/^https?\:\/\//i, "");
        website = website.replace(/\/$/, "");
        triggerPrimaryColurs();
    }


    function scrapeSite(website) {
        thinkingBubble(true);
        $.ajax({
            dataType: "jsonp",
            url: "http://localhost:5000/query?url=" + website,
            success: function (data) {
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
            chosenSecondaryColor = $(this).attr("data-color");
            triggerName();
        });

        //INPUT WEBSITE
        $(document).on("click", "#website-url>button", function () {
            website = $("#website-url input").val();
            scrapeSite(website);
        });
        $(document).on("click", "#name>button", function () {
            name = $("#name input").val();
            triggerPosition();
        });

        $(document).on("click", "#position>button", function () {
            position = $("#position input").val();
            triggerEmail();
        });

        $(document).on("click", "#email>button", function () {
            email = $("#email input").val();
            triggerPhone();
        });

        $(document).on("click", "#phone>button", function () {
            phoneNumber = $("#phone input").val();
            triggerExit();
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