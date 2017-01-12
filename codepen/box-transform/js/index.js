'use strict';

var box = document.querySelector('.box p.t');
var panel = document.querySelector('.control-panel');
var style = box.style;
var ranges = [];
var colorList = [];

var props = {
    "rotateX": "50deg",
    "rotateY": "50deg",
    "rotateZ": "50deg",
    "scaleX": "50",
    "scaleY": "50",
    "scaleZ": "50",
    "translateX": "0px",
    "translateY": "0px",
    "translateZ": "0px",
    "skewX": "0deg",
    "skewY": "0deg"
};


for (var key in props) {
    style[key] = props[key];
    var value = parseInt(props[key]);
    ranges.push('<label><b>' + key + '</b><input type="range" value="' + value + '" max="150" name="' + key + '" onchange="changeProp(event)"/></label>');
}


panel.innerHTML = ranges.join('\n');

var transformStyle = {}
function changeProp(e) {
    var target = e.target;
    var transform = [];
    if (target.type === 'range') {
        var origin = props[target.name];
        let value = origin.replace(/\d+/, target.value);
        if (target.name.match(/scale/)) {
            value = value / 30;
        }
        transformStyle[target.name] = value
    }
    for (let key in transformStyle) {
        let value = transformStyle[key];
        transform.push(`${key}(${value})`)
    }
    style.transform = transform.join(' ');
}