var panels = document.querySelectorAll('[data-toggler]');
var enabledClass = 'is-enabled';
var toggledClass = 'is-toggled';

function toggleAcordeon(event) {
  var element = this;
  var body = element.querySelector('[data-toggler-body]');
  element.classList.toggle(toggledClass);
}

[].forEach.call(panels, function(panel){
  panel.classList.add(enabledClass);
  panel.addEventListener('click', toggleAcordeon, false);
})

if (typeof AdobeEdge !== 'undefined') {

  //Adobe edge animations
  AdobeEdge.loadComposition('strava', 'EDGE-151779426', {
    scaleToFit: "none",
    centerStage: "none",
    minW: "0",
    maxW: "undefined"
  }, {"dom": {}}, {
    "style": {
      "${symbolSelector}": {
        "isStage": "true",
        "rect": ["undefined", "undefined", "488px", "880px"],
        "fill": ["rgba(255,255,255,1)"]
      }
    },
    "dom": [{
      "rect": ["0px", "0px", "487px", "879px", "auto", "auto"],
      "id": "Poster2",
      "fill": ["rgba(0,0,0,0)", "/strava/Poster2.png", "0px", "0px"],
      "type": "image",
      "tag": "img"
    }]
  });

  AdobeEdge.loadComposition('soundhound', 'EDGE-9119118', {
    scaleToFit: "none",
    centerStage: "none",
    minW: "0",
    maxW: "undefined"
  }, {
    "style": {
      "${symbolSelector}": {
        "isStage": "true",
        "rect": ["undefined", "undefined", "1200px", "500px"]
      }
    }, "dom": {}
  }, {
    "style": {
      "${symbolSelector}": {
        "isStage": "true",
        "rect": ["undefined", "undefined", "488px", "880px"]
      }
    },
    "dom": [{
      "rect": ["0", "0", "488px", "880px", "auto", "auto"],
      "id": "Poster2",
      "fill": ["rgba(0,0,0,0)", "/soundhound/Poster2.png", "0px", "0px"],
      "type": "image",
      "tag": "img"
    }]
  });

  AdobeEdge.loadComposition('schiphol', 'EDGE-8022608', {
    scaleToFit: "none",
    centerStage: "none",
    minW: "0",
    maxW: "undefined"
  }, {
    "style": {
      "${symbolSelector}": {
        "isStage": "true",
        "rect": ["undefined", "undefined", "488px", "880px"],
        "fill": ["rgba(255,255,255,1)"]
      }
    }, "dom": {}
  }, {
    "style": {
      "${symbolSelector}": {
        "isStage": "true",
        "rect": ["undefined", "undefined", "488px", "880px"]
      }
    },
    "dom": [{
      "id": "Poster",
      "type": "",
      "rect": ["0", "0", "auto", "auto", "auto", "auto"]
    }, {
      "rect": ["0px", "0px", "487px", "879px", "auto", "auto"],
      "id": "Poster22",
      "fill": ["rgba(0,0,0,0)", "/schiphol/Poster22.png", "0px", "0px"],
      "type": "image",
      "tag": "img"
    }]
  });

}
