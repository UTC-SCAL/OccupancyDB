var lastColorElement;
var lastColorModeElement;

function init(isDarkMode) {
    // Load up the last selected color
    var currentColor = document.getElementsByClassName("color")[0].innerHTML;
    lastColorElement = document.getElementsByClassName("ui " + currentColor + " button")[0];
    $(lastColorElement).removeClass("basic");

    // Load up the last selected light/dark mode
    lastColorModeElement = document.getElementsByClassName("ui " + (isDarkMode ? "black" : "white") + " button")[0];
    $(lastColorModeElement).removeClass("basic");

    if (isDarkMode) {
        $(".ui").addClass("inverted");
        $("body").addClass("inverted");
    }

    $('.ui.modal').modal();
    $(".ui.middle.aligned.center.aligned.grid").css("margin-top", $(".ui.top.fixed.menu").height());
    $("body").show();

    const wrong_pass = location.href.includes("?wrong_pass");
    if (wrong_pass) {
        $(".ui.error.message").hide();
        document.getElementsByClassName("ui error message")[0].innerHTML = "Old password was incorrect.";
        $(".ui.error.message").show();
    }
}

function submitModePref(element) {
    // Visual update
    $(lastColorModeElement).addClass("basic");
    $(element).removeClass("basic");
    lastColorModeElement = element;
    // Prepare the request
    var reqBody = {
        "dark_pref": lastColorModeElement.innerText.includes("Dark"),
        "color_pref": lastColorElement.innerText.toLowerCase()
    };
    // Send the request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/change-colors", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(reqBody));
}

function submitColor(element) {
    // Visual update
    $(lastColorElement).addClass("basic");
    $(element).removeClass("basic");
    lastColorElement = element;
    // Prepare the request
    var reqBody = {
        "dark_pref": lastColorModeElement.innerText.includes("Dark"),
        "color_pref": lastColorElement.innerText.toLowerCase()
    };
    // Send the request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/change-colors", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(reqBody));
}

$(document)
    .ready(function () {
        $('.ui.form')
            .form({
                fields: {
                    old_pass: {
                        identifier: 'old_pass',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your old password'
                        }]
                    },
                    new_pass: {
                        identifier: 'new_pass',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please enter your new password'
                        },
                        {
                            type: 'length[6]',
                            prompt: 'Your new password must be at least 6 characters'
                        }
                        ]
                    },
                    new_pass_conf: {
                        identifier: 'new_pass_conf',
                        rules: [{
                            type: 'empty',
                            prompt: 'Please confirm your new password'
                        },
                        {
                            type: 'match[new_pass]',
                            prompt: "Your passwords must match"
                        }
                        ]
                    }
                }
            });
    });


function drawData(rawData) {
    const element = document.getElementById("docs");
    element.innerHTML += "<br>";
    rawData.forEach((e) => {
        element.innerHTML += e.status + " : " + e.timestamp + "<br>";
    });
}