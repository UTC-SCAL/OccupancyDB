function init() {
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