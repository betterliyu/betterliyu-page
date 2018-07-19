import $ from 'jquery';

class Works {
  constructor() {
  }

  init() {
    this.handlerScroll();
    $(window).scroll(() => {
      this.handlerScroll();
    });
    $(window).resize(() => {
      this.handlerScroll();
    });
  }

  handlerScroll() {
    const $pics = $('#works').find('.c-work-item');
    $.each($pics, function (index, w) {
      const top = w.getBoundingClientRect().top;
      if (top < window.innerHeight) {
        $(w).addClass('fadeInUp');
      }
    });
  }


}

export default new Works();