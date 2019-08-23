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

    const hasErrored = location.href.includes("error");
    const acctExists = location.href.includes("exists")
    if (hasErrored) {
        $(".ui.error.message").hide();
        document.getElementsByClassName("ui error message")[0].innerHTML = "There was an error in registration.";
        $(".ui.error.message").show();
    } else if (acctExists) {
        $(".ui.error.message").hide();
        document.getElementsByClassName("ui error message")[0].innerHTML = "An account already exists under this email.";
        $(".ui.error.message").show();
    }

    $("body").show();

    // Auto-select the input field
    $("#email").select();
}

$(document).ready(function () {
    $('.ui.form').form({
        fields: {
            email: {
                identifier: 'email',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your e-mail'
                },
                {
                    type: 'email',
                    prompt: 'Please enter a valid e-mail'
                }
                ]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your password'
                },
                {
                    type: 'length[6]',
                    prompt: 'Your password must be at least 6 characters'
                }
                ]
            },
            password_conf: {
                identifier: 'password_conf',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your password'
                },
                {
                    type: 'length[6]',
                    prompt: 'Your password must be at least 6 characters'
                },
                {
                    type: 'match[password]',
                    prompt: "Your passwords must match"
                }
                ]
            }
        }
    });
});