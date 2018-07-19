import $ from 'jquery';

class Header {
  init() {
    $(window).scroll(() => {
      this.fixHeader();
      this.scaleHero();
    });

    $(window).resize(() => {
      this.fixHeader();
      this.scaleHero();
    });
  }

  fixHeader() {
    const $header = $('#header');
    const $main = $('#main');
    const navHeight = $header[0].getBoundingClientRect().height;
    const mainTop = $main[0].getBoundingClientRect().top;
    if (mainTop < navHeight) {
      $header.addClass('fixed');
    } else {
      $header.removeClass('fixed');
    }
  }

  scaleHero() {
    const $hero = $('#hero');
    const heroHeight = $hero[0].getBoundingClientRect().height;
    var scale = (heroHeight - $(window).scrollTop() / 2) / heroHeight;
    $hero.children('.container').eq(0).css({ 'transform': 'scale(' + scale + ')' });
  }
}

export default new Header();