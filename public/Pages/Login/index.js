function init() {

    const hasErrored = location.href.includes("error");
    const hasLoggedOff = location.href.includes("logged_off");
    if (hasErrored) {
        $(".ui.error.message").hide();
        document.getElementsByClassName("ui error message")[0].innerHTML = "Your Login or Password was Incorrect";
        $(".ui.error.message").show();
    } else if (hasLoggedOff) {
        $(".ui.error.message").hide();
        document.getElementsByClassName("ui error message")[0].innerHTML = "You've successfully been logged out!";
        $(".ui.error.message").show();
    }
    $("body").show();
    // Auto-select the input field
    $("#email").select();
}

$(document)
    .ready(function () {
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
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
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your password'
                            },
                            {
                                type: 'length[6]',
                                prompt: 'Your password must be at least 6 characters'
                            }
                        ]
                    }
                }
            })
            ;
    })
    ;