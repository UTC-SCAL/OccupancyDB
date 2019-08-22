
function init() {
    $(".ui.slider.checkbox").checkbox({
        onChecked: () => {
            window.localStorage.setItem("darkmode", 'yes');
            $(".ui").addClass("inverted");
            $("body").addClass("inverted");
            $(".ui.toggle.checkbox").removeClass("inverted");
            $(".ui.slider.checkbox").checkbox('set checked');
        },
        onUnchecked: () => {
            window.localStorage.setItem("darkmode", 'no');
            $(".ui").removeClass("inverted");
            $(".ui.slider.checkbox").checkbox('set unchecked');
        }
    });

    var mode = window.localStorage.getItem("darkmode");
    // Init the color scheme based on dark mode

    if (mode === undefined || mode === null) {
        window.localStorage.setItem("darkmode", 'no');
        mode = "no";
    } else {
        if (mode === "yes") {
            window.localStorage.setItem("darkmode", 'yes');
            $(".ui").addClass("inverted");
            $("body").addClass("inverted");
            $(".ui.slider.checkbox").checkbox('set checked');
        }
    }

    if (location.href.includes("toggle_error")) {
        $(".ui.error.message").text("There was a critical error");
        $(".ui.error.message").show();
    }
    // Reveal the body now for better appearance
    $("body").show();
}
