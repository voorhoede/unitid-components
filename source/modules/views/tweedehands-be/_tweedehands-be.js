var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
  windowHeight = window.outerWidth || document.documentElement.clientHeight || document.body.clientHeight, //fix for ie8
  windowWidth = window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth; //fix for ie8

  function beforeAfterMobile () {
  var beforeAfter = document.querySelectorAll('.js-beforeAfter'),
    controllers, ruler,
    int,
    fragment;

  ruler = document.createElement('div');
  ruler.className = 'ruler';

  controllers = document.createElement('div');

  var cntrls = [
    [document.createElement('a'), "#", 'controller after-cntrl left', ''],
    [document.createElement('a'), "#", 'controller before-cntrl right', '']
  ];

  fragment = document.createDocumentFragment();

  for(int=0;int<cntrls.length;int++){
    cntrls[int][0].href = cntrls[int][1];
    cntrls[int][0].className = cntrls[int][2];
    cntrls[int][0].appendChild(document.createTextNode(cntrls[int][3]));
    fragment.appendChild(cntrls[int][0]);
  }

  controllers.appendChild(fragment.cloneNode(true));
  controllers.className = 'js-beforeAfter-controllers before-after-controllers';

  [].forEach.call(beforeAfter, function(baContainer){
    baContainer.appendChild(controllers.cloneNode(true));
    baContainer.querySelector('[data-image-container]').appendChild(ruler.cloneNode(true));
    baContainer.className += ' mobileBA ';
    var containerWidth = document.querySelector('.after').offsetWidth;
    baContainer.querySelectorAll('.before img')[0].style.width = containerWidth + 'px';
    switchBeforeAfterState(baContainer, '.controller');
  });

  function switchBeforeAfterState(container, switchControllers) {
    var switchControlls = document.querySelectorAll(switchControllers),
      baContainer,
      activeClass = 'active',
      startPosition;

    var parent = container.querySelectorAll('.before')[0].parentNode;

    container.querySelectorAll('.before img')[0].style.width = parent.offsetWidth;

    function setActive(clicked) {
      for (int = 0; int < switchControlls.length; int++) {
        switchControlls[int].className = switchControlls[int].className.replace(' '+activeClass,"");
      }
      clicked.className += ' '+activeClass;
    }

    [].forEach.call(switchControllers, function(el){
      function switchState () {
        baContainer = el.parentNode.parentNode;
        setActive(el);
        startPosition = Math.ceil(baContainer.querySelector('.before').offsetWidth / baContainer.offsetWidth * 100);

        if(el.className.match('before-cntrl') === null) {
          animate(baContainer.querySelector('.before'), 'width', startPosition, 0, 200);
          animate(baContainer.querySelector('.ruler'), 'left', startPosition, 0, 200);
        } else {
          animate(baContainer.querySelector('.before'), 'width', startPosition, 100, 200);
          animate(baContainer.querySelector('.ruler'), 'left', startPosition, 99.5, 200);
        }
      }

      if(document.addEventListener){
        el.addEventListener('click', function (e) {
          e.preventDefault();
          switchState(e);
        }, false);
      } else {
        el.attachEvent('onclick', function (e) {
          event.returnValue = false;
          switchState(e);
        });
      }
    });

  }
}

function beforeAfter () {
  var ruler,
    rulerEnd,
    offX,
    offY;

  var config = {
    containerSelector: '[data-before-after-container]',
    container: document.querySelectorAll(this.containerSelector)
  };

  ruler = document.createElement('div');
  rulerEnd = document.createElement('div');

  ruler.className = 'ruler';
  rulerEnd.className = 'rulerEnd';

  ruler.appendChild(rulerEnd);

  function addListeners(options) {
    options = options || {};

    if (typeof options.element === 'object'){
      return options.element.addEventListener(options.listener, options.functionToCall, options.boolean);
    }
    if (typeof options.element === 'string'){
      options.element = document.querySelectorAll(options.element);
    }
    if(options.element) {
      [].forEach.call(options.element, function(el){
        return el.addEventListener(options.listener, options.functionToCall, options.boolean);
      });
    }
  }

  function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
  }

  function mouseDown(e) {
    if (e === null) {
      e = window.event;
    }

    offX = e.clientX - parseInt(this.offsetLeft);
    offY = e.clientY - parseInt(this.offsetTop);

    if (this.parentNode.classList) {
      this.parentNode.classList.add('drag');
    }else {
      this.parentNode.className += ' ' + 'drag';
    }
    container = this.parentNode;
    window.addEventListener('mousemove', divMove, true);
  }

  function divMove(e) {
    if (e.clientX - offX < 1) {
      return false;
    }
    if (e.clientX - offX > (container.offsetWidth - ruler.offsetWidth)) {
      return false;
    }
    var parent = container.querySelectorAll('.before')[0].parentNode;
    container.querySelectorAll('.before img')[0].style.width = parent.offsetWidth;
    ruler = container.querySelector('.ruler');
    ruler.style.left = (e.clientX - offX) / parent.offsetWidth * 100 + '%';
    container.querySelectorAll('.before')[0].style.width = (e.clientX - offX) / parent.offsetWidth * 100 + '%';
  }

  [].forEach.call(document.querySelectorAll(config.containerSelector), function(element){
    console.log(element);
    var containerWidth = element.offsetWidth;

    element.appendChild(ruler.cloneNode(true));
    element.className += ' desktopBA ';
    element.querySelectorAll('.before img')[0].style.width = containerWidth + 'px';
  });

  addListeners({
    element : '.ruler',
    listener : 'mousedown',
    functionToCall : mouseDown,
    boolean : false
  });
  addListeners({
    element : window,
    listener : 'mouseup',
    functionToCall : mouseUp,
    boolean : false
  });
}

if(mobile || windowWidth < 768 ) {
//if(mobile || isIE() && isIE() <=8 || windowWidth < 768 ) {
  beforeAfterMobile();
} else {
  beforeAfter();
}
