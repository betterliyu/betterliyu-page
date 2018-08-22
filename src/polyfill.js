import 'babel-polyfill';
import $ from 'zepto';

$(function ($) {
  // prevent zoom
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);


  // fuck ad uc browser add
  function fuckUC() {
    $("a").each(function () {
      try {
        var thishref = $(this).attr("href");
        var thisText = $(this).html();
        if (thishref.indexOf("uc.cn") >= 0) {
          $(this).replaceWith(thisText);
        }
      }
      catch (e) {
        console.log('fuck UC');
      }
    });
    $("script").each(function () {
      try {
        var thissrc = $(this).attr("src");
        if (thissrc.indexOf("ucbrowser") >= 0) {
          $(this).remove();
        }
      }
      catch (e) {
        console.log('fuck UC');
      }
    });
  }
  var pageDATA_ua = window.navigator.userAgent.toLowerCase();
  if (pageDATA_ua.indexOf('ucbrowser') >= 0) { setInterval(() => fuckUC(), 1000); }
});
