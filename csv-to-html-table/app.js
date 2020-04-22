(function() {

    var convertButton = document.getElementById("convert");
    convertButton.addEventListener("click", convertCSVToTable);
    var inputText = document.getElementById("input-text");
    var output = document.getElementById("output");
    var firstRowHeader = document.getElementById("firstRowHeader");

    function getTableRow(args, header) {
        var row = document.createElement("tr");
        for (var i = 0; i < args.length; i++) {
            var column = document.createElement(header === true ? "th" : "td");
            column.innerText = args[i];
            row.appendChild(column);
        }
        return row;
    }

    function convertCSVToTable() {
        var input = inputText.value;
        var lines = input.split("\n");
        var table = document.createElement("table");
        table.className = "pure-table pure-table-bordered";

        if (firstRowHeader.checked) {
            var thead = document.createElement("thead");
            thead.appendChild(getTableRow(lines[0].split(","), true));
            lines.splice(0, 1);
            table.appendChild(thead);
        }

        var tbody = document.createElement("tbody");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            tbody.appendChild(getTableRow(line.split(",")));
        }
        table.appendChild(tbody);
        output.innerHTML = "";
        output.appendChild(table);
    }

})();
