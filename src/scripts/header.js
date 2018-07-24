import $ from 'zepto';

class Header {
  init() {
    this.fixHeader();
    this.scaleHero();
    $(window).on('scroll', () => {
      this.fixHeader();
      this.scaleHero();
    });

    $(window).on('resize', () => {
      this.fixHeader();
      this.scaleHero();
    });
  }

  fixHeader() {
    const $hero = $('#hero');
    const $header = $('#header');
    const $main = $('#main');
    const navHeight = $header[0].getBoundingClientRect().height;
    const mainTop = $main[0].getBoundingClientRect().top;
    if (mainTop < navHeight) {
      $hero.addClass('hide');
      $header.addClass('fixed');
    } else {
      $hero.removeClass('hide');
      $header.removeClass('fixed');
      if ($(window).scrollTop() <= 0) {
        $header.addClass('fixed-under-hero');
      } else {
        $header.removeClass('fixed-under-hero');
      }
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