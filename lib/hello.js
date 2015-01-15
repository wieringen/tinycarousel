function Hello(subject) {
  this.subject = subject || 'World';
}

Hello.prototype.register = function register(el) {
  this._addEvent(el, 'click', function(o) {
    return function() {
      o.hello.apply(o, arguments)
    }
  }(this));
};

Hello.prototype.hello = function helloWorld() {
  document.title = ['Hello ', this.subject, '!'].join('');
};

Hello.prototype._addEvent = function _addEvent(el, event, handler) {
  if (el.attachEvent)  {
    el.attachEvent('on' + event, handler);
  }
  else {
    el.addEventListener(event, handler, false);
  }
};