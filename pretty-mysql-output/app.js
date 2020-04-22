(function() {

    var convertButton = document.getElementById("convert");
    convertButton.addEventListener("click", prettyMySQLOutput);
    var inputText = document.getElementById("input-text");
    var output = document.getElementById("output");

    if (!Object.values) {
        Object.values = function values(O) {
            var keys = Object.keys(O);
            var values = [];
            for (var i = 0; i < keys.length; i++) {
                values.push(O[keys[i]]);
            }
            return values;
        };
    }

    function getObject(data) {
        var lines = data.split("\n");
        var response = [],
            index = -1,
            obj = {};
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.substr(0, 10) === "**********") {
                if (index != -1) {
                    response.push(obj);
                    obj = {};
                }
                index++;
            } else {
                var kv = line.split(":");
                var key = kv[0].trim();
                kv.splice(0, 1);
                obj[key] = kv.join(":").trim();
            }
        }
        response.push(obj);
        return response;
    }

    function getCSVFromObjectArr(objArr) {
        var keys = Object.keys(objArr[0]);
        var data = keys.join(",");
        for (var i = 0; i < objArr.length; i++) {
            data += "<br>" + Object.values(objArr[i]).join(",");
        }
        return data;
    }

    function prettyMySQLOutput() {
        var obj = getObject(inputText.value);
        if ((document.getElementsByClassName("csvType")[0]).checked) {
            output.innerHTML = getCSVFromObjectArr(obj);
        } else {
            output.innerHTML = JSON.stringify(obj);
        }
    }

})();
