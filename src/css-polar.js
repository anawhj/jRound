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
        var polar_element = document.querySelector(polar_id);
        var polarWidth = parseFloat(window.getComputedStyle(polar_element, null).getPropertyValue("width"));

        var polarChildren = polar_element.childNodes;
        for (var j = 0; j < polarChildren.length; j++) {
            var polarChild = polarChildren[j];
            if (typeof polarChild.tagName !== 'undefined') {
                var polarChildWidth = parseFloat(window.getComputedStyle(polarChild, null).getPropertyValue("width"));
                console.log("polarChild j: " + j);
                console.log(polarChild);
                if (polarChild.dataset.polarDistance !== undefined) {
                    var polarDistance = polarChild.dataset.polarDistance;
                    if (polarDistance == undefined)
                        polarDistance = "0px";
                    var polarAngle = polarChild.dataset.polarAngle;
                    if (polarAngle == undefined)
                        polarAngle = "0deg";
                    console.log("distance: " + polarDistance);
                    console.log("angle: " + polarAngle);
                    // assume that deg, %
                    polarAngle = parseFloat(polarAngle);
                    if (polarDistance.indexOf("%") > 0) {
                        polarDistance = (polarWidth / 2) * (parseFloat(polarDistance) / 100.0);
                    } else { // if (polarDistance.indexOf("px") > 0) {
                        polarDistance = parseFloat(polarDistance);
                    }
                    var x = Math.cos(Math.PI / 180 * polarAngle) * polarDistance + (polarWidth / 2) - polarChildWidth / 2;
                    var y = -Math.sin(Math.PI / 180 * polarAngle) * polarDistance + (polarWidth / 2) - polarChildWidth / 2;
                    console.log("x: " + x + " y: " + y);
                    var translate3d = "translate3d(" + x + "px, " + y + "px, 0px)";
                    polarChild.style.transform = translate3d;
                }
            }
        }
    },
    init = function() {
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