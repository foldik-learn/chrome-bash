var app = app || {};

$(document).ready(function() {
    $("#line-1").focus();
    $("#line-1").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            console.log($("#line-1").text())
        }
    })
    $("#line-1").parent().click(function(event) {
        $("#line-1").focus();
    })
})