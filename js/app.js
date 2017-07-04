var app = app || {};

app.collatz = function() {
    var n = 101;
    var sequence = [];
    do {
        sequence.push(n);
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    } while (n > 1);
    return sequence;
}

app.commandHandler = (function($document) {

    var commandIndex = -1;
    var inputLineCount = 1;
    var $actualInputLine;

    var previousCommands = [];

    function setUpCommandLine() {
        $actualInputLine.focus();
        $actualInputLine.keydown(function(event) {
            if (event.which === 13) {
                event.preventDefault();
                evaluateCommand();
            } else if (event.which === 38 && commandIndex > -1) { /*Up*/
                event.preventDefault();
                $actualInputLine.text(previousCommands[commandIndex]);
                commandIndex = commandIndex - 1;
            } else if (event.which === 40 && commandIndex < previousCommands.length - 1) { /*Down*/
                event.preventDefault();
                $actualInputLine.text(previousCommands[commandIndex]);
                commandIndex = commandIndex + 1;
            }
        })
        $actualInputLine.parent()
            .click(function(event) {
                $actualInputLine.focus();
            });
    }

    function appendNextInputLine() {
        $actualInputLine.attr('contentEditable', 'false');
        inputLineCount = inputLineCount + 1;
        $('#container').append('<div class="input-line-container"><span class="input-line-marker">[' + inputLineCount + '] &gt;</span><div id="line-' + inputLineCount + '" class="input-line" contentEditable="true"></div></div>');
        $actualInputLine = $('#line-' + inputLineCount);
        setUpCommandLine();
    }

    function evaluateCommand() {
        previousCommands.push($actualInputLine.text());
        commandIndex = previousCommands.length - 1;
        if ($actualInputLine.text() === 'collatz') {
            $('#container').append('<div class="result-container">[' + app.collatz().join(' | ') + ']</div>')
        } else {
            $('#container').append('<div class="result-container">[' + $actualInputLine.text() + ']</div>')
        }
        appendNextInputLine();
    }

    $document.ready(function() {
        $actualInputLine = $('#line-1');
        setUpCommandLine();
    });

    return {
        evaluateCommand: evaluateCommand
    }

})($(document));