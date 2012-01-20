function toggleView(stackId, viewId) {
    if (stackId.length > 0 && viewId.length > 0) {
        var stack = document.getElementById(stackId);
        
        if (stack != null) {
            var allViews = stack.childNodes;
    
            for (var i = 0; i < allViews.length; i++) {
                $(allViews[i]).css("position", "absolute");
                $(allViews[i]).css("left", "-10000px");
            }
    
            var visibleView = document.getElementById(viewId);
    
            if (visibleView != null) {
                $(visibleView).css("position", "relative");
                $(visibleView).css("left", "0px");
            }
        }
    }
}

function addBarChart(chartId, data) {
    var datas = data.split(";");
    
    var line = new Array();
    
    for (i = 0; i < datas.length; i++) {
        var subdatas = datas[i].split(",");

        var series = new Array();

        for (j = 0; j < subdatas.length; j++) {
            series[j] = parseFloat(subdatas[j]);
        }

        line[i] = series;
    }
    
    if (line.length < 1 || line[0] == 0) {
        line = [[10,25,15,20,30]];
    }

    $.jqplot(chartId, line, {
        seriesDefaults:{shadow: false, renderer:$.jqplot.BarRenderer, rendererOptions: {padding: 5}}, grid:{shadow: false, background: '#ffffff', borderWidth: 0},
        axes: {xaxis: {renderer:$.jqplot.CategoryAxisRenderer}, yaxis:{min: 0}}
    });
}

function addLineChart(chartId, data) {
    var datas = data.split(";");
    
    var line = new Array();
    
    for (i = 0; i < datas.length; i++) {
        var subdatas = datas[i].split(",");

        var series = new Array();

        for (j = 0; j < subdatas.length; j++) {
            series[j] = parseFloat(subdatas[j]);
        }

        line[i] = series;
    }
    
    if (line.length < 1 || line[0] == 0) {
        line = [[10,25,15,20,30]];
    }
    
    $.jqplot(chartId, line, {
        seriesDefaults:{shadow: false, rendererOptions: {padding: 5}}, grid:{shadow: false, background: '#ffffff', borderWidth: 0}
    });
}

function addPieChart(chartId, data) {
    var datas = data.split(",");
    
    var line = new Array();
    
    for (i = 0; i < datas.length; i++) {
        line[i] = parseFloat(datas[i]);
    }
    
    if (line.length < 1 || line[0] == 0) {
        line = [10,25,15,20,30]
    }
    
    $.jqplot(chartId, [line], {
        seriesDefaults:{shadow: false, renderer:$.jqplot.PieRenderer, rendererOptions: {padding: 2}}, grid:{shadow: false, background: '#ffffff', borderWidth: 1}
    });
}

function switchState(nodeId, stateId) {
    var currentStateId = currentState[nodeId];
    
    if (currentStateId != null && currentStateId != stateId) {
        var currentStateInfo = states[nodeId + "-" + currentStateId];
        var stateInfo = states[nodeId + "-" + stateId];
        
        if (currentStateInfo != null && stateInfo != null) {
            var node = document.getElementById(nodeId);
            
            for (var attr in stateInfo) {            
                var attrVal = stateInfo[attr];
                var currentAttrVal = currentStateInfo[attr];

                if (attrVal != null && attrVal != currentAttrVal) {
                    if (attr == "checked" || attr == "disabled" || attr == "multiple") {
                        node.setAttribute(attr, "true");
                    } else if (attr == "src") {
                        node.setAttribute(attr, attrVal);
                    } else if (attr == "value") {
                        node.value = attrVal;
                    } else if (attr == "content" || attr == "data") {
                        
                        $(node).html(attrVal);
                    } else if (attr == "background-position" || attr == "background-repeat" || attr == "text-align" || attr == "vertical-align" ||
                               attr == "font-family" || attr == "bold" || attr == "italic" || attr == "underline") {
                        if (currentAttrVal != null && currentAttrVal != "") {
                            $(node).removeClass(currentAttrVal);
                        }
                        $(node).addClass(attrVal);
                    } else {
                        $(node).css(attr, attrVal);
                    }
                }
            }
            
            for (var attr in currentStateInfo) {            
                var currentAttrVal = currentStateInfo[attr];

                if (!(attr in stateInfo)) {
                    if (attr == "checked" || attr == "disabled" || attr == "multiple" || attr == "src") {
                        node.removeAttribute(attr);
                    } else if (attr == "value") {
                        node.value = "";
                    } else if (attr == "content" || attr == "data") {
                        node.innerHTML = "";
                    } else if (attr == "background-position" || attr == "background-repeat" || attr == "text-align" || attr == "vertical-align" ||
                               attr == "font-family" || attr == "bold" || attr == "italic" || attr == "underline") {
                        if (currentAttrVal != null && currentAttrVal != "") {
                            $(node).removeClass(currentAttrVal);
                        }
                    } else {
                        $(node).css(attr, "");
                    }
                }
            }
        }
        
        currentState[nodeId] = stateId;
    }
}