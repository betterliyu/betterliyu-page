import $ from 'jquery';
import { trimEnd } from 'lodash';

import { cadweb, ops, npm } from './reponsive-imgs.js';

class Works {
  constructor() {
  }

  init() {

    this.createSrcset();


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

  createSrcset() {
    const mapping = [
      { name: 'cadweb', dom: $('#cadwebPic'), imgs: cadweb },
      { name: 'ops', dom: $('#opsPic'), imgs: ops },
      { name: 'npm', dom: $('#bwidgetPic'), imgs: npm }
    ];

    mapping.forEach(m => {
      const svgDom = m.dom.find('source[type="image/svg+xml"]');
      const imgDom = m.dom.find('img[sizes]');
      if (svgDom.length > 0 && m.imgs.svg) {
        svgDom.attr('srcset', m.imgs.svg);
      }
      if (imgDom.length > 0) {
        let srcstes = "";
        Object.keys(m.imgs).forEach(k => {
          if (k === 'svg') return;
          srcstes += ` ${m.imgs[k]} ${k}w,`;
        });
        imgDom.attr('src', m.imgs[320]);
        imgDom.attr('srcset', trimEnd(srcstes, ','));
      }
    });
  }
}

export default new Works();