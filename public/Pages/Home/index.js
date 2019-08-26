function toggleStatus(element) {
    if (element.innerText === "House is Empty") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/away", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        element.innerText = "House is Occupied";
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/home", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        element.innerText = "House is Empty";
    }
}
function init(isDarkMode) {

    if (isDarkMode) {
        $(".ui").addClass("inverted");
        $("body").addClass("inverted");
    }

    if (location.href.includes("toggle_error")) {
        $(".ui.error.message").text("There was a critical error");
        $(".ui.error.message").show();
    }


    $('.ui.dropdown').dropdown({on: 'hover'});
    // Reveal the body now for better appearance
    $("body").show();
}
