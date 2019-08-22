function init() {
    $(".ui.slider.checkbox").checkbox({
        onChecked: () => {
            window.localStorage.setItem("darkmode", 'yes');
            $(".ui").addClass("inverted");
            $("body").addClass("inverted");
            $(".ui.slider.checkbox").checkbox('set checked');
        },
        onUnchecked: () => {
            window.localStorage.setItem("darkmode", 'no');
            $(".ui").removeClass("inverted");
            $("body").removeClass("inverted");
            $(".ui.slider.checkbox").checkbox('set unchecked');
        }
    });
    $('.ui.dropdown').dropdown();

    var mode = window.localStorage.getItem("darkmode");
    if (mode === undefined || mode === null) {
        window.localStorage.setItem("darkmode", 'no');
        mode = false;
    } else {
        if (mode === "yes") {
            $(".ui").addClass("inverted");
            $("body").addClass("inverted");
            $(".ui.slider.checkbox").checkbox('set checked');
        }
    }

    $(".ui.middle.aligned.center.aligned.grid").css("margin-top", $(".ui.top.fixed.menu").height());
    $('.ui.modal').modal();
    $("body").show();

    const wrong_pass = location.href.includes("?wrong_pass");
    if (wrong_pass) {
        $(".ui.error.message").hide();
        document.getElementsByClassName("ui error message")[0].innerHTML = "Old password was incorrect.";
        $(".ui.error.message").show();
    }
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