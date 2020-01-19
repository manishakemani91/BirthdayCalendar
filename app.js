function generatediv() {
    try {
        var dataInput = isJSON(document.getElementById("jsonInput").value);
        if (dataInput) {

            clearChildNodes();
            var month = document.getElementById('numberInput').value;
            var filteredResult = dataInput.filter(x => x.birthday.indexOf(month) > -1);

            if (filteredResult && filteredResult.length > 0) {

                var sortedResult = filteredResult.sort((a, b) => {
                    a = new Date(a.birthday);
                    b = new Date(b.birthday);
                    return (b - a);
                });
                if (sortedResult && sortedResult.length > 0) {
                    sortedResult.forEach(element => {
                        createChildNodes(element);
                    });
                }

                var childElement = document.getElementsByClassName("mainbody");
                Array.prototype.forEach.call(childElement, function (el) {
                    if (!el.hasChildNodes()) {
                        var item = document.createElement("div");
                        item.setAttribute("data-tooltip", 'No Birthday');
                        item.setAttribute("class", "empty-node");
                        item.innerHTML = ':S';
                        el.appendChild(item);
                    }
                });
            }
        }
        else {
            alert('invalid json');
            return false;
        }
    }
    catch (e) {
        alert('error occured..');
        return;
    }
}

function clearChildNodes() {
    var childElement = document.getElementsByClassName("mainbody");
    Array.prototype.forEach.call(childElement, function (el) {
        el.innerHTML = '';
    });
}

function createChildNodes(element) {
    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const month = (new Date(element.birthday)).getMonth();
    var ParentElement = document.getElementById(monthNames[month]);
    var childElement = ParentElement.getElementsByClassName("mainbody")[0];
    childElement.style["grid-template-columns"] = "repeat(3,1fr)";
    const initials = element.name.split(" ").map((n) => n[0]).join("");
    var info = initials;
    var item = document.createElement("div");
    item.setAttribute("data-tooltip", element.name);
    item.setAttribute("class", "child-item");
    item.innerHTML = info;
    childElement.appendChild(item);
}

function isJSON(str) {
    try {
        return (JSON.parse(str));
    } catch (e) {
        return false;
    }
}
