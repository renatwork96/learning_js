'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.addSelector = function() {
  
  let div = document.createElement('div');
  

  if (this.selector[0] === '.' ) {
    div.innerHTML = 'Добавлен class ' + this.selector;
    document.body.append(div);
  } else if (this.selector[0] === '#') {
    div = document.createElement('div');
    div.innerHTML = 'Добавлен id ' + this.selector;
    document.body.append(div);
  }

  div.style.cssText = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg}; fontSize: ${this.fontSize}px`;
};

const domElement1 = new DomElement('.text', 40, 300, 'red', 16);
const domElement2 = new DomElement('#text', 40, 300, 'green', 16);

domElement1.addSelector();
domElement2.addSelector();