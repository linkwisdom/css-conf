'use strict';

var box = document.querySelector('.box');
var panel = document.querySelector('.control-panel');

var colorPanel = document.querySelector('.color-panel');

var style = box.style;
var ranges = [];
var colorList = [];

var props = {
    "width": "50px",
    "height": "50px",
    "borderWidth": "50px",
    "borderRightWidth": "50px",
    "borderBottomWidth": "50px",
    "borderLeftWidth": "50px",
    "borderTopWidth": "50px",
    "borderRadius": "0px",
    "borderBottomLeftRadius": "0px",
    "borderBottomRightRadius": "0px",
    "borderTopLeftRadius": "0px",
    "borderTopRightRadius": "0px",
    "outlineWidth": "0px"
};

var colors = {
    "borderColor": "#000",
    "backgroundColor": "#FFF",
    "borderRightColor": "red",
    "borderBottomColor": "green",
    "borderLeftColor": "blue",
    "borderTopColor": "yellow"
};

for (var key in props) {
    style[key] = props[key];
    var value = parseInt(props[key]);
    ranges.push('<label><b>' + key + '</b><input type="range" value="' + value + '" max="150" name="' + key + '" onchange="changeProp(event)"/></label>');
}

for (var key in colors) {
    style[key] = colors[key];
    var value = colors[key];
    colorList.push('<label><b>' + key + '</b><input type="color" value="' + value + '" name="' + key + '" onchange="changeProp(event)"/></label>');
}

colorList.push('<label><b>boxShadow</b><textarea name="boxShadow" onchange="changeProp(event)">2px 5px 15px red</textarea></label>');

panel.innerHTML = ranges.join('\n');
colorPanel.innerHTML = colorList.join('\n');

function changeProp(e) {
    var target = e.target;
    if (target.type === 'range') {
        style[target.name] = target.value + 'px';
    }
    style[target.name] = target.value;
}