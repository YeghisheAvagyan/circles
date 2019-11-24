function createCircles(count) {
    var circle = "";
    var circleBackgrounds = ["red", "blue", "yellow", "black", "green"];
    for (var i = 1; i <= count; ++i) {
        var circleSize = Math.floor(Math.random() * 50) + 30;
        var circuleDiv = document.createElement("div");
        var R = Math.floor(Math.random() * 255);
        var G = Math.floor(Math.random() * 255);
        var B = Math.floor(Math.random() * 255);
        var bgColor = `rgb(${R},${G},${B})`;
        var styles = {
            "width": circleSize + "px",
            "height": circleSize + "px",
            "background-color": bgColor,
            "position": "absolute",
            "display": "inline-block",
            "border-radius": "50%",
            "top": "0px",
            "left": "0px"
        }
        var validStyle = SetValidPositions(circleSize);
        styles.top = validStyle.top;
        styles.left = validStyle.left;
        Object.assign(circuleDiv.style, styles);

        circuleDiv.onclick = function() {
            document.getElementById("text-input").setAttribute("style", "color:" + this.style.backgroundColor);
        };
        document.getElementById("circles").appendChild(circuleDiv);
        circle = "";
    }
}

function SetValidPositions(circleSize) {
    var top;
    var left;
    var ParentElement = document.getElementById('circles');
    var children = ParentElement.children;
    var existingElementStyles = [];
    Object.keys(children).forEach(key => {
        var obj = {
            "top": parseInt(children[key].style.top.replace("px", "")),
            "left": parseInt(children[key].style.left.replace("px", "")),
            "width": parseInt(children[key].style.width.replace("px", "")),
            "height": parseInt(children[key].style.height.replace("px", ""))
        }
        existingElementStyles.push(obj);
    });

    for (var m = 0;; m++) {
        var top = Math.floor(Math.random() * (300 - circleSize));
        var left = Math.floor(Math.random() * (document.body.clientWidth - circleSize));
        var IsValid = true;
        for (var i = 0; i < existingElementStyles.length; i++) {
            //pyutagorasi teoremov hasvum enq es erku srjanagceri kentronneri heravorutyun@ c = armat(qarakusi(a)+qaraqkusi(b))
            //shrjanagcer@ nergcvac en qarakusinerin
            var a = (top + circleSize / 2) - (existingElementStyles[i].top + existingElementStyles[i].height / 2);
            var b = (left + circleSize / 2) - (existingElementStyles[i].left + existingElementStyles[i].left / 2);
            //hashvecinq kentronneri mijev heravorutyun@
            var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            //sharavxer@ klinen
            var R1 = circleSize / 2;
            var R2 = existingElementStyles[i].width / 2;
            //ete shrjanagceri sharavxeri gumar@ meca kentronneri mijev heravorutyunic apa shrjanagcer@ hatvum en
            var intersect = (R1 + R2) > c;
            if (intersect) {

                IsValid = false;
                break;
            }
        }
        if (IsValid) {
            break;
        }
    }

    return {
        top: top + "px",
        left: left + "px"
    };

}

(function Start() {
    appendCircles();
    setInterval(appendCircles, 5000);
})();

function appendCircles() {
    document.getElementById('circles').innerHTML = "";
    var count = Math.floor(Math.random() * 70) + 30;
    createCircles(count);
}