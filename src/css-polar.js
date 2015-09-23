/* jRound v0.1.2: polar coordinates polyfill
 *
 * Copyright 2015 LG Electronics Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. */
 
(function(w) {
    "use strict";
    var jRound = {};
    var drawPolar = function(polar_id) {
        var polarElement = document.querySelector(polar_id);
        
        var containingBlock = polarElement.parentNode;
		var containingBlockWidth = parseFloat(window.getComputedStyle(containingBlock, null).getPropertyValue("width"));
		
		if (typeof polarElement.tagName !== 'undefined') {
			var polarElementWidth = parseFloat(window.getComputedStyle(polarElement, null).getPropertyValue("width"));
			if (polarElement.dataset.polarDistance !== undefined) {
				var polarDistance = polarElement.dataset.polarDistance;
				if (polarDistance == undefined)
					polarDistance = "0px";
				var polarAngle = polarElement.dataset.polarAngle;
				if (polarAngle == undefined)
					polarAngle = "0deg";
				var polarAnchor = polarElement.dataset.polarAnchor;
				if (polarAnchor == undefined)
					polarAnchor = "center";
					
				console.log("distance: " + polarDistance);
				console.log("angle: " + polarAngle);
				console.log("anchor: " + polarAnchor);
				
				polarAngle = parseFloat(polarAngle);
				
				if (polarDistance.indexOf("%") > 0) {
					polarDistance = (containingBlockWidth / 2) * (parseFloat(polarDistance) / 100.0);
				} else { // if (polarDistance.indexOf("px") > 0) {
					polarDistance = parseFloat(polarDistance);
				}
						
				var anchorPoint = getAnchorPoint(polarAnchor, containingBlockWidth, polarElementWidth, polarAngle, polarDistance);			
				
				console.log("x: " + anchorPoint.x + " y: " + anchorPoint.y);
				
				var translate3d = "translate3d(" + anchorPoint.x + "px, " + anchorPoint.y + "px, 0px)";
				
				polarElement.style.transform = translate3d;
			}
		}
        
    },
	getAnchorPoint = function(valueString, containingBlockWidth, elementWidth, polarAngle, polarDistance) {
		var valueList = valueString.split(' ');
				
		var anchorX, anchorY;
        switch (valueList.length) {
            case 0:
                anchorX = elementWidth/2;
				anchorY = elementWidth/2;
                break;
            case 1:
                if (valueList[0] == "center") {
					anchorX = elementWidth/2;
					anchorY = elementWidth/2;
				} else if (valueList[0] == "top") {
					anchorX = elementWidth/2;
					anchorY = 0;
				} else if (valueList[0] == "bottom") {
					anchorX = elementWidth/2;
					anchorY = elementWidth;
				} else if (valueList[0] == "left") {
					anchorX = 0;
					anchorY = elementWidth/2;
				} else if (valueList[0] == "right") {
					anchorX = elementWidth;
					anchorY = elementWidth/2;
				}				
                break;
            case 2:
                if (valueList[0] == "center") {
					anchorX = elementWidth/2;
				} else if (valueList[0] == "left") {
					anchorX = 0;
				} else if (valueList[0] == "right") {
					anchorX = elementWidth;
				} else {
					if (valueList[0].indexOf("%") > 0) {
						anchorX = elementWidth * (parseFloat(valueList[0]) / 100.0);
					} else if (valueList[0].indexOf("px") > 0) {
						anchorX = parseFloat(valueList[0]);
					}
				}
				
				if (valueList[1] == "center") {
					anchorY = elementWidth/2;
				} else if (valueList[1] == "top") {
					anchorY = 0;
				} else if (valueList[1] == "bottom") {
					anchorY = elementWidth;
				} else {
					if (valueList[1].indexOf("%") > 0) {
						anchorY = elementWidth * (parseFloat(valueList[1]) / 100.0);
					} else if (valueList[1].indexOf("px") > 0) {
						anchorY = parseFloat(valueList[1]);
					}
				}
                break;
            case 3:
				if (valueList[0] == "center") {
					anchorX = elementWidth/2;
				} else if (valueList[0] == "left") {
					anchorX = 0;
					
					if (valueList[1].indexOf("%") > 0) {
						anchorX = anchorX +  elementWidth * (parseFloat(valueList[1]) / 100.0);
					} else if (valueList[1].indexOf("px") > 0) {
						anchorX = anchorX + parseFloat(valueList[1]);
					} else {
						
					}
				} else if (valueList[0] == "right") {
					anchorX = elementWidth;
					
					if (valueList[1].indexOf("%") > 0) {
						anchorX = anchorX +  elementWidth * (1 - (parseFloat(valueList[1]) / 100.0));
					} else if (valueList[1].indexOf("px") > 0) {
						anchorX = anchorX - parseFloat(valueList[1]);
					} else {
						
					}
				}
				
                break;
			case 4:
				//for the first value
                if (valueList[0] == "center") {
					anchorX = elementWidth/2;
				} else if (valueList[0] == "left") {
					anchorX = 0;
					
					if (valueList[1].indexOf("%") > 0) {
						anchorX = anchorX +  elementWidth * (parseFloat(valueList[1]) / 100.0);
					} else if (valueList[1].indexOf("px") > 0) {
						anchorX = anchorX + parseFloat(valueList[1]);
					}
				} else if (valueList[0] == "right") {
					anchorX = elementWidth;
					
					if (valueList[1].indexOf("%") > 0) {
						anchorX = anchorX +  elementWidth * (1 - (parseFloat(valueList[1]) / 100.0));
					} else if (valueList[1].indexOf("px") > 0) {
						anchorX = anchorX - parseFloat(valueList[1]);
					}
				}
				
				//for the second value
				if (valueList[2] == "center") {
					anchorY = elementWidth/2;
				} else if (valueList[2] == "top") {
					anchorY = 0;
					
					if (valueList[3].indexOf("%") > 0) {
						anchorY = anchorY +  elementWidth * (parseFloat(valueList[3]) / 100.0);
					} else if (valueList[3].indexOf("px") > 0) {
						anchorY = anchorY + parseFloat(valueList[3]);
					}
				} else if (valueList[2] == "bottom") {
					anchorY = elementWidth;
					
					if (valueList[3].indexOf("%") > 0) {
						anchorY = anchorY +  elementWidth * (1 - (parseFloat(valueList[3]) / 100.0));
					} else if (valueList[3].indexOf("px") > 0) {
						anchorY = anchorY - parseFloat(valueList[3]);
					}
				}
				break;
        }
		
		var point = {
			x: Math.sin(Math.PI / 180 * polarAngle) * polarDistance + (containingBlockWidth / 2) - anchorX,
			y: -Math.cos(Math.PI / 180 * polarAngle) * polarDistance + (containingBlockWidth / 2) - anchorY
		};
		
		return point;
    },
    init = function() {
		var polarAnchor = jRound.getSelectors("polar-anchor", "*");
        for (var i = 0; i < polarAnchor.length; i++) {
            if (document.querySelector(polarAnchor[i].selector)) {
                document.querySelector(polarAnchor[i].selector).dataset.polarAnchor = polarAnchor[i].value;
			}
        }
        var polarDistance = jRound.getSelectors("polar-distance", "*");
        for (var i = 0; i < polarDistance.length; i++) {
            if (document.querySelector(polarDistance[i].selector))
                document.querySelector(polarDistance[i].selector).dataset.polarDistance = polarDistance[i].value;
        }
        var polarAngle = jRound.getSelectors("polar-angle", "*");
        for (var i = 0; i < polarAngle.length; i++) {
            if (document.querySelector(polarAngle[i].selector))
				document.querySelector(polarAngle[i].selector).dataset.polarAngle = polarAngle[i].value;
        }
        var idList = jRound.getSelectors("position", "polar");
        for (var i = 0; i < idList.length; i++) {
            if (document.querySelector(idList[i].selector)) {
                drawPolar(idList[i].selector);
            }
        }		
    };
    window.addEventListener("load", function() {
        if (typeof w.jRound === "undefined") {
            w.jRound = {};
        }
        jRound = w.jRound;
        jRound.initBorderBoundary = init;
        jRound.screen = {
            width: 400,
            height: 400,
            radius: [200, 200],
        };
        init();
    });
})(this);