(function (dom) {

  var panels = dom.querySelectorAll('[data-toggler]');
  var enabledClass = 'is-enabled';
  var toggledClass = 'is-toggled';
  var ie8 = document.querySelector('.ie8');

  /**
   * Borrowed from: http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/
   * @param {HtmlElement} element
   * @param {String} className
   */
  function toggleClass(element, className, force) {
    var isForced = (typeof force !== 'undefined');
    if (document.documentElement.classList) {
      if(isForced){
        return element.classList.toggle(className, force);
      } else {
        return element.classList.toggle(className);
      }
    } else {
      if (containsClass(element, className) || (isForced && !force)){
        var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
        element.className = element.className.replace(regexp, '$2');
        return false;
      } else {
        element.className += (element.className ? ' ' : '') + className;
        return true;
      }
    }
  }

  function toggleAcordeon(event) {
    var element = this;
    var body = element.querySelector('[data-toggler-body]');
    toggleClass(element, toggledClass);
  }


  for(var int=0; int<panels.length; int++){
    panels[int].className += (panels[int].className ? ' ' : '') + enabledClass;
    if (panels[int].addEventListener) {
      panels[int].addEventListener("click", toggleAcordeon, false);
    }
    else {
      panels[int].attachEvent("onclick", toggleAcordeon);
    }
  }


  if (typeof AdobeEdge !== 'undefined' && ie8 === null) {
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


})(document)
