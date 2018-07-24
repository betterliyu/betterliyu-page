import 'babel-polyfill';
import Zepto from 'zepto';

Zepto(function ($) {
  // prevent zoom
  $(document).on('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  var lastTouchEnd = 0;
  $(document).on('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

});
