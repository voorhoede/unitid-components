// Code goes here

console.log('do something');

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
