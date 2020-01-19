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
                }
                );
                if (sortedResult && sortedResult.length > 0) {
                    sortedResult.forEach(element => {
                        createChildNodes(element);
                    });
                }
            }
        }
    }
    catch (e) {
        alert('invalid input');
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
    //childElement.innerHTML = '';
    // var number = parseInt(document.getElementById('numberInput').value);
    //    for (var i = 0; i < number; i++) {
    // var info = `I am div ${i}`;
    const initials = element.name.split(" ").map((n) => n[0]).join("");
    var info = initials;
    var item = document.createElement("div");
    // childElement.setAttribute("class","flex-container");
    // item.setAttribute("id", `${ParentElement.id}-${i}`);
    item.setAttribute("data-content", element.name);
    item.setAttribute("class", "child-item");
    item.innerHTML = info;

    childElement.appendChild(item);
    //   }
}

function isJSON(str) {
    try {
        return (JSON.parse(str));
    } catch (e) {
        return false;
    }
}

function convertToDate(dateString) {
    var dateArr = dateString.split("/");
    return new Date(+dateArr[2], dateArr[1] - 1, dateArr[0]);
}