import $ from 'jquery';

class Scroll {

  init() {
    $(window).scroll(() => {
      this.headerScroll();
    });

    $(window).resize(() => {
      this.headerScroll();
    });
  }

  headerScroll() {
    const $hero = $('#hero');
    const $header = $('#header');
    const $main = $('#main');

    const heroHeight = $hero[0].getBoundingClientRect().height;
    const navHeight = $header[0].getBoundingClientRect().height;
    const mainTop = $main[0].getBoundingClientRect().top;

    if (mainTop < navHeight) {
      $header.addClass('fixed');
    } else {
      $header.removeClass('fixed');
    }
    var scale = (heroHeight - $(window).scrollTop() / 2) / heroHeight;
    $hero.children('.container').eq(0).css({ 'transform': 'scale(' + scale + ')' });
  }
}

export default new Scroll();